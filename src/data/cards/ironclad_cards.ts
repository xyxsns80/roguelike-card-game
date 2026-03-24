/**
 * Ironclad starter cards
 */

import type { Card } from '@/types'
import { CardType, CardRarity, TargetType } from '@/types'

export const IRONCLAD_STARTER_DECK: Card[] = [
  // Basic Attack Cards (4x)
  {
    id: 'strike',
    name: '打击',
    description: '造成 6 点伤害。',
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
    name: '防御',
    description: '获得 5 点护甲。',
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
    name: '重击',
    description: '造成 8 点伤害。施加 2 层易伤。',
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
    name: '愤怒',
    description: '造成 6 点伤害。将此牌的一张复制品放入你的弃牌堆。',
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
    name: '横扫',
    description: '对所有敌人造成 8 点伤害。',
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
    name: '铁浪',
    description: '获得 5 点护甲。造成 5 点伤害。',
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
    name: '柄击',
    description: '造成 9 点伤害。抽 1 张牌。',
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
    name: '一笑了之',
    description: '获得 8 点护甲。抽 1 张牌。',
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
    name: '武装',
    description: '获得 5 点护甲。在本场战斗中将手牌中的一张牌升级。',
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
    name: '肉搏',
    description: '造成等于你护甲值的伤害。',
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
    name: '展示力量',
    description: '获得 2 点力量。在你的回合结束时,失去 2 点力量。',
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
    name: '重剑',
    description: '造成 14 点伤害。力量对此牌的效果影响 3 次。',
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
