/**
 * 卡牌类型定义 - roguelike 卡牌游戏
 */

export enum CardType {
  ATTACK = 'attack',   // 攻击卡
  SKILL = 'skill',     // 技能卡
  POWER = 'power',     // 能力卡
  CURSE = 'curse',     // 诅咒卡
  STATUS = 'status'    // 状态卡
}

export enum CardRarity {
  BASIC = 'basic',     // 基础
  COMMON = 'common',   // 普通
  UNCOMMON = 'uncommon', // 罕见
  RARE = 'rare',       // 稀有
  CURSE = 'curse'      // 诅咒
}

export enum TargetType {
  SELF = 'self',           // 自己
  ENEMY = 'enemy',         // 敌人
  ALL_ENEMIES = 'all_enemies' // 所有敌人
}

export interface CardEffect {
  type: 'damage' | 'block' | 'buff' | 'debuff' | 'draw' | 'energy' | 'heal'
  value?: number           // 效果数值
  target?: TargetType      // 目标类型
  duration?: number        // 持续时间
  buffType?: string        // 增益/减益类型
}

export interface Card {
  id: string               // 卡牌ID
  name: string             // 卡牌名称
  description: string      // 卡牌描述
  cost: number             // 能量消耗
  type: CardType           // 卡牌类型
  rarity: CardRarity       // 稀有度
  effects: CardEffect[]    // 效果列表
  target?: TargetType      // 目标类型
  image?: string           // 卡牌图片
  isUpgraded: boolean      // 是否已升级
}

export interface Deck {
  cards: Card[]            // 所有卡牌
  drawPile: Card[]         // 抽牌堆
  hand: Card[]             // 手牌
  discardPile: Card[]      // 弃牌堆
  exhaustPile: Card[]      // 消耗堆
}

export interface GameState {
  deck: Deck
  energy: number
  maxEnergy: number
  turn: number
  phase: 'player' | 'enemy' | 'ended'
}
