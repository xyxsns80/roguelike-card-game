/**
 * Card pool and reward system
 */

import type { Card } from '@/types'
import { IRONCLAD_STARTER_DECK } from '@/data/cards/ironclad_cards'

// Card pool for rewards (all cards except starter basics)
export const CARD_POOL: Card[] = IRONCLAD_STARTER_DECK.filter(card =>
  card.rarity !== 'basic' || card.id === 'bash'
)

// Weight by rarity
const RARITY_WEIGHTS: Record<string, number> = {
  basic: 0,
  common: 5,
  uncommon: 3,
  rare: 1,
  curse: 0,
  status: 0
}

/**
 * Generate random card rewards based on current deck
 */
export function generateCardRewards(currentDeck: Card[], count: number = 3): Card[] {
  const rewards: Card[] = []
  const availableCards = CARD_POOL.filter(card =>
    !currentDeck.some(c => c.id === card.id)
  )

  for (let i = 0; i < count; i++) {
    if (availableCards.length === 0) break

    // Weight random selection by rarity
    const card = selectWeightedCard(availableCards)
    if (card) {
      rewards.push({ ...card })
      // Remove from available to avoid duplicates
      const index = availableCards.findIndex(c => c.id === card.id)
      if (index !== -1) availableCards.splice(index, 1)
    }
  }

  return rewards
}

/**
 * Select a card using rarity weights
 */
function selectWeightedCard(cards: Card[]): Card | null {
  if (cards.length === 0) return null

  // Calculate total weight
  const totalWeight = cards.reduce((sum, card) =>
    sum + (RARITY_WEIGHTS[card.rarity] || 1), 0
  )

  // Random selection
  let random = Math.random() * totalWeight

  for (const card of cards) {
    const weight = RARITY_WEIGHTS[card.rarity] || 1
    random -= weight
    if (random <= 0) return card
  }

  return cards[0]
}

/**
 * Upgrade a card to its enhanced version
 */
export function upgradeCard(card: Card): Card {
  return {
    ...card,
    isUpgraded: true,
    id: `${card.id}_upgraded`,
    name: `${card.name}+`,
    // Upgrade effects will be modified based on card type
    effects: card.effects.map(effect => upgradeEffect(effect))
  }
}

/**
 * Upgrade a single card effect
 */
function upgradeEffect(effect: any): any {
  switch (effect.type) {
    case 'damage':
      return { ...effect, value: (effect.value || 0) + 3 }
    case 'block':
      return { ...effect, value: (effect.value || 0) + 3 }
    case 'heal':
      return { ...effect, value: (effect.value || 0) + 2 }
    case 'draw':
      return { ...effect, value: (effect.value || 0) + 1 }
    case 'debuff':
    case 'buff':
      return { ...effect, value: (effect.value || 0) + 1, duration: (effect.duration || 1) + 1 }
    default:
      return effect
  }
}

/**
 * Get upgraded description for a card
 */
export function getUpgradedDescription(card: Card): string {
  const baseDesc = card.description
  const upgraded = upgradeCard(card)

  // Simple approach: show effect differences
  let desc = baseDesc

  card.effects.forEach((effect, index) => {
    const upgradedEffect = upgraded.effects[index]
    if (effect.value && upgradedEffect.value && effect.value !== upgradedEffect.value) {
      desc = desc.replace(
        effect.value.toString(),
        upgradedEffect.value.toString()
      )
    }
  })

  return desc
}
