/**
 * Card types and interfaces for the roguelike card game
 */

export enum CardType {
  ATTACK = 'attack',
  SKILL = 'skill',
  POWER = 'power',
  CURSE = 'curse',
  STATUS = 'status'
}

export enum CardRarity {
  BASIC = 'basic',
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  CURSE = 'curse'
}

export enum TargetType {
  SELF = 'self',
  ENEMY = 'enemy',
  ALL_ENEMIES = 'all_enemies'
}

export interface CardEffect {
  type: 'damage' | 'block' | 'buff' | 'debuff' | 'draw' | 'energy' | 'heal'
  value?: number
  target?: TargetType
  duration?: number
  buffType?: string
}

export interface Card {
  id: string
  name: string
  description: string
  cost: number
  type: CardType
  rarity: CardRarity
  effects: CardEffect[]
  target?: TargetType
  image?: string
  isUpgraded: boolean
}

export interface Deck {
  cards: Card[]
  drawPile: Card[]
  hand: Card[]
  discardPile: Card[]
  exhaustPile: Card[]
}

export interface GameState {
  deck: Deck
  energy: number
  maxEnergy: number
  turn: number
  phase: 'player' | 'enemy' | 'ended'
}
