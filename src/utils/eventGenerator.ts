/**
 * Event generation utilities
 */

import type { GameEvent, EventReward } from '@/types/event'
import { GAME_EVENTS } from '@/data/events/gameEvents'

const RARITY_WEIGHTS = {
  common: 6,
  uncommon: 3,
  rare: 1
}

/**
 * Generate a random event
 */
export function generateRandomEvent(): GameEvent | null {
  if (GAME_EVENTS.length === 0) return null

  // Weighted random selection by rarity
  const totalWeight = GAME_EVENTS.reduce(
    (sum, event) => sum + (RARITY_WEIGHTS[event.rarity || 'common'] || 1),
    0
  )

  let random = Math.random() * totalWeight

  for (const event of GAME_EVENTS) {
    const weight = RARITY_WEIGHTS[event.rarity || 'common'] || 1
    random -= weight
    if (random <= 0) {
      return { ...event }
    }
  }

  return { ...GAME_EVENTS[0] }
}

/**
 * Process event rewards with randomness
 */
export function processEventRewards(
  choiceId: string,
  event: GameEvent
): EventReward[] {
  const choice = event.choices.find(c => c.id === choiceId)
  if (!choice) return []

  // Handle special events with randomness
  if (event.id === 'mysterious_merchant') {
    if (choiceId === 'gamble_gold') {
      if (Math.random() < 0.5) {
        return [
          { type: 'gold', value: 80, message: 'Lucky! You won the gamble and gained 80 gold!' }
        ]
      } else {
        return [
          { type: 'gold', value: -30, message: 'Unlucky! You lost your 30 gold bet.' }
        ]
      }
    }

    if (choiceId === 'gamble_health') {
      if (Math.random() < 0.5) {
        return [
          { type: 'max_health', value: 25, message: 'Incredible! Your body feels stronger. Gain 25 Max HP!' }
        ]
      } else {
        return [
          { type: 'health', value: -20, message: 'The dark magic backfires! You lose 20 HP.' }
        ]
      }
    }
  }

  return choice.rewards
}

/**
 * Check if a choice can be taken
 */
export function canTakeChoice(
  choiceId: string,
  event: GameEvent,
  currentGold: number,
  currentHealth: number
): { canTake: boolean; reason?: string } {
  const choice = event.choices.find(c => c.id === choiceId)
  if (!choice) return { canTake: false, reason: 'Choice not found' }

  if (choice.requirements) {
    if (choice.requirements.gold && currentGold < choice.requirements.gold) {
      return { canTake: false, reason: `Need ${choice.requirements.gold} gold` }
    }
    if (choice.requirements.health && currentHealth <= choice.requirements.health) {
      return { canTake: false, reason: `Need more than ${choice.requirements.health} HP` }
    }
  }

  return { canTake: true }
}
