/**
 * 事件系统类型定义
 */

import type { Card } from './card'

export type EventRewardType = 'gold' | 'health' | 'card' | 'max_health' | 'none'
// 奖励类型: 金币 | 生命值 | 卡牌 | 最大生命值 | 无

export interface EventReward {
  type: EventRewardType  // 奖励类型
  value?: number         // 奖励数值
  card?: Card            // 卡牌奖励
  message: string        // 奖励消息
}

export interface EventChoice {
  id: string             // 选项ID
  text: string           // 选项文本
  rewards: EventReward[] // 奖励列表
  requirements?: {       // 需求
    gold?: number        // 金币需求
    health?: number      // 生命值需求
  }
  disabled?: boolean     // 是否禁用
  disabledReason?: string // 禁用原因
}

export interface GameEvent {
  id: string             // 事件ID
  title: string          // 事件标题
  description: string    // 事件描述
  choices: EventChoice[] // 选项列表
  rarity?: 'common' | 'uncommon' | 'rare'  // 稀有度:普通|罕见|稀有
}
