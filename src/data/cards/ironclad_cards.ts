/**
 * Ironclad starter cards
 */

import type { Card } from '@/types'
import { CardType, CardRarity, TargetType } from '@/types'

export const IRONCLAD_STARTER_DECK: Card[] = [
  // Basic Attack Cards (4x)
  {
    id: 'strike',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    type: CardType.ATTACK,
    rarity: CardRarity.BASIC,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 6,
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  },

  // Basic Defense Cards (4x)
  {
    id: 'defend',
    name: 'Defend',
    description: 'Gain 5 block.',
    cost: 1,
    type: CardType.SKILL,
    rarity: CardRarity.BASIC,
    target: TargetType.SELF,
    effects: [
      {
        type: 'block',
        value: 5,
        target: TargetType.SELF
      }
    ],
    isUpgraded: false
  },

  // Bash
  {
    id: 'bash',
    name: 'Bash',
    description: 'Deal 8 damage. Apply 2 Vulnerable.',
    cost: 2,
    type: CardType.ATTACK,
    rarity: CardRarity.BASIC,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 8,
        target: TargetType.ENEMY
      },
      {
        type: 'debuff',
        value: 2,
        duration: 2,
        buffType: 'vulnerable',
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  },

  // Anger
  {
    id: 'anger',
    name: 'Anger',
    description: 'Deal 6 damage. Add a copy of this card to your discard pile.',
    cost: 0,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 6,
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  },

  // Cleave
  {
    id: 'cleave',
    name: 'Cleave',
    description: 'Deal 8 damage to all enemies.',
    cost: 1,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ALL_ENEMIES,
    effects: [
      {
        type: 'damage',
        value: 8,
        target: TargetType.ALL_ENEMIES
      }
    ],
    isUpgraded: false
  },

  // Iron Wave
  {
    id: 'iron_wave',
    name: 'Iron Wave',
    description: 'Gain 5 block. Deal 5 damage.',
    cost: 1,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'block',
        value: 5,
        target: TargetType.SELF
      },
      {
        type: 'damage',
        value: 5,
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  },

  // Pommel Strike
  {
    id: 'pommel_strike',
    name: 'Pommel Strike',
    description: 'Deal 9 damage. Draw 1 card.',
    cost: 1,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 9,
        target: TargetType.ENEMY
      },
      {
        type: 'draw',
        value: 1
      }
    ],
    isUpgraded: false
  },

  // Shrug It Off
  {
    id: 'shrug_it_off',
    name: 'Shrug It Off',
    description: 'Gain 8 block. Draw 1 card.',
    cost: 1,
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    target: TargetType.SELF,
    effects: [
      {
        type: 'block',
        value: 8,
        target: TargetType.SELF
      },
      {
        type: 'draw',
        value: 1
      }
    ],
    isUpgraded: false
  },

  // Armaments
  {
    id: 'armaments',
    name: 'Armaments',
    description: 'Gain 5 block. Upgrade a card in your hand this combat.',
    cost: 1,
    type: CardType.SKILL,
    rarity: CardRarity.UNCOMMON,
    target: TargetType.SELF,
    effects: [
      {
        type: 'block',
        value: 5,
        target: TargetType.SELF
      }
    ],
    isUpgraded: false
  },

  // Body Slam
  {
    id: 'body_slam',
    name: 'Body Slam',
    description: 'Deal damage equal to your block.',
    cost: 1,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 0,
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  },

  // Flex
  {
    id: 'flex',
    name: 'Flex',
    description: 'Gain 2 Strength. At the end of your turn, lose 2 Strength.',
    cost: 0,
    type: CardType.SKILL,
    rarity: CardRarity.COMMON,
    target: TargetType.SELF,
    effects: [
      {
        type: 'buff',
        value: 2,
        duration: 1,
        buffType: 'strength',
        target: TargetType.SELF
      }
    ],
    isUpgraded: false
  },

  // Heavy Blade
  {
    id: 'heavy_blade',
    name: 'Heavy Blade',
    description: 'Deal 14 damage. Strength affects this card 3 times.',
    cost: 2,
    type: CardType.ATTACK,
    rarity: CardRarity.COMMON,
    target: TargetType.ENEMY,
    effects: [
      {
        type: 'damage',
        value: 14,
        target: TargetType.ENEMY
      }
    ],
    isUpgraded: false
  }
]

// Helper to create card copies with unique IDs
function createCardCopy(card: Card, index: number): Card {
  return {
    ...card,
    id: `${card.id}_${index}`
  }
}

// Create starter deck with 4x Strike and 4x Defend
export function createStarterDeck(): Card[] {
  const strikeCard = IRONCLAD_STARTER_DECK[0]
  const defendCard = IRONCLAD_STARTER_DECK[1]
  const bashCard = IRONCLAD_STARTER_DECK[2]

  const strikes = Array.from({ length: 4 }, (_, i) => createCardCopy(strikeCard, i))
  const defends = Array.from({ length: 4 }, (_, i) => createCardCopy(defendCard, i + 4))
  const bash = createCardCopy(bashCard, 8)

  return [...strikes, ...defends, bash]
}
