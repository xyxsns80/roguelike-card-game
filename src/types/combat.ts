/**
 * 战斗系统类型定义
 */

import { Card } from './card'

export interface Character {
  name: string            // 名称
  currentHealth: number   // 当前生命值
  maxHealth: number       // 最大生命值
  block: number           // 护甲值
  buffs: Buff[]           // 增益/减益效果列表
  image?: string          // 图片
}

export interface Enemy extends Character {
  intent: EnemyIntent     // 敌人意图
  ai: EnemyAI             // 敌人AI
}

export interface EnemyIntent {
  type: 'attack' | 'defend' | 'buff' | 'debuff'  // 意图类型:攻击/防御/增益/减益
  value: number           // 意图数值
  moves: number           // 行动次数
}

export type EnemyAI = (enemy: Enemy, player: Character) => EnemyIntent

export interface Buff {
  id: string              // 效果ID
  name: string            // 效果名称
  description: string     // 效果描述
  value: number           // 效果数值
  duration: number        // 持续时间
  type: 'positive' | 'negative'  // 效果类型:正面/负面
}

export interface CombatState {
  player: Character       // 玩家角色
  enemies: Enemy[]        // 敌人列表
  turn: number            // 回合数
  phase: 'player' | 'enemy' | 'ended'  // 战斗阶段
  selectedCard: Card | null   // 选中的卡牌
  selectedEnemy: number | null // 选中的敌人索引
  isPlayerTurn: boolean   // 是否玩家回合
}

export interface CombatLogEntry {
  type: 'player' | 'enemy' | 'system'  // 日志类型
  message: string         // 日志消息
  timestamp: number       // 时间戳
}
