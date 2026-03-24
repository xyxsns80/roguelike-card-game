/**
 * Game events with meaningful choices
 */

import type { GameEvent } from '@/types/event'

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'the_shrine',
    title: 'The Shrine',
    description: 'You discover an ancient shrine glowing with mysterious energy. You can either pay respects, search for treasures, or leave it be.',
    rarity: 'common',
    choices: [
      {
        id: 'pray',
        text: 'Pray (Heal 20 HP)',
        rewards: [
          { type: 'health', value: 20, message: 'You feel blessed and recover 20 HP.' }
        ]
      },
      {
        id: 'search',
        text: 'Search for treasure',
        rewards: [
          { type: 'gold', value: 40, message: 'You find 40 gold hidden beneath the shrine.' },
          { type: 'health', value: -10, message: 'But you trigger a trap and lose 10 HP!' }
        ]
      },
      {
        id: 'leave',
        text: 'Leave it alone',
        rewards: [
          { type: 'none', message: 'You decide to leave the shrine undisturbed.' }
        ]
      }
    ]
  },

  {
    id: 'wandering_swordmaster',
    title: 'The Wandering Swordmaster',
    description: 'An old swordmaster offers to teach you a technique, but demands payment.',
    rarity: 'uncommon',
    choices: [
      {
        id: 'pay_gold',
        text: 'Pay 50 gold (Gain 30 Max HP)',
        requirements: { gold: 50 },
        rewards: [
          { type: 'gold', value: -50, message: 'You pay 50 gold.' },
          { type: 'max_health', value: 30, message: 'The master teaches you secret techniques. Gain 30 Max HP!' }
        ]
      },
      {
        id: 'pay_health',
        text: 'Spar with him (Lose 15 HP, Gain 20 Max HP)',
        requirements: { health: 15 },
        rewards: [
          { type: 'health', value: -15, message: 'You take a beating during the spar.' },
          { type: 'max_health', value: 20, message: 'But you learn from the experience. Gain 20 Max HP!' }
        ]
      },
      {
        id: 'decline',
        text: 'Politely decline',
        rewards: [
          { type: 'none', message: 'The master nods respectfully and walks away.' }
        ]
      }
    ]
  },

  {
    id: 'mysterious_merchant',
    title: 'The Mysterious Merchant',
    description: 'A hooded figure offers you a mysterious deal.',
    rarity: 'rare',
    choices: [
      {
        id: 'gamble_gold',
        text: 'Gamble 30 gold (50% chance for 80 gold)',
        requirements: { gold: 30 },
        rewards: [] // Will be handled dynamically
      },
      {
        id: 'gamble_health',
        text: 'Risk it all (50% chance for +25 Max HP, 50% chance for -20 HP)',
        requirements: { health: 20 },
        rewards: [] // Will be handled dynamically
      },
      {
        id: 'ignore',
        text: 'Ignore the merchant',
        rewards: [
          { type: 'none', message: 'You decide not to trust the mysterious figure.' }
        ]
      }
    ]
  },

  {
    id: 'the_fountain',
    title: 'The Mystic Fountain',
    description: 'A beautiful fountain sparkles before you. The water seems to have magical properties.',
    rarity: 'common',
    choices: [
      {
        id: 'drink',
        text: 'Drink from it',
        rewards: [
          { type: 'health', value: 25, message: 'The water is refreshing. You heal 25 HP.' }
        ]
      },
      {
        id: 'wash_face',
        text: 'Wash your face',
        rewards: [
          { type: 'gold', value: 20, message: 'You feel refreshed and find 20 gold in your pocket.' }
        ]
      },
      {
        id: 'leave',
        text: 'Leave it alone',
        rewards: [
          { type: 'none', message: 'You decide not to disturb the fountain.' }
        ]
      }
    ]
  },

  {
    id: 'big_chest',
    title: 'The Big Chest',
    description: 'You find a massive chest! However, it seems to be trapped.',
    rarity: 'uncommon',
    choices: [
      {
        id: 'open_carefully',
        text: 'Open carefully',
        rewards: [
          { type: 'gold', value: 60, message: 'You carefully disarm the traps and find 60 gold!' }
        ]
      },
      {
        id: 'smash_open',
        text: 'Smash it open',
        rewards: [
          { type: 'gold', value: 100, message: 'You find 100 gold!' },
          { type: 'health', value: -15, message: 'But you trigger a trap and lose 15 HP!' }
        ]
      },
      {
        id: 'ignore',
        text: 'Leave it',
        rewards: [
          { type: 'none', message: 'Better safe than sorry. You leave the chest.' }
        ]
      }
    ]
  },

  {
    id: 'the_fallen_hero',
    title: 'The Fallen Hero',
    description: 'You come across the remains of a fallen adventurer. Their gear is scattered about.',
    rarity: 'common',
    choices: [
      {
        id: 'loot',
        text: 'Loot the body',
        rewards: [
          { type: 'gold', value: 35, message: 'You find 35 gold on the body.' }
        ]
      },
      {
        id: 'bury',
        text: 'Give them a proper burial',
        rewards: [
          { type: 'health', value: 15, message: 'You feel a sense of peace and recover 15 HP.' },
          { type: 'gold', value: 15, message: 'You also find 15 gold to cover burial costs.' }
        ]
      },
      {
        id: 'leave',
        text: 'Leave in peace',
        rewards: [
          { type: 'none', message: 'You pay your respects and continue on.' }
        ]
      }
    ]
  }
]
