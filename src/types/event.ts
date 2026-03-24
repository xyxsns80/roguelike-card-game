/**
 * Event system types
 */

import type { Card } from './card'

export type EventRewardType = 'gold' | 'health' | 'card' | 'max_health' | 'none'

export interface EventReward {
  type: EventRewardType
  value?: number
  card?: Card
  message: string
}

export interface EventChoice {
  id: string
  text: string
  rewards: EventReward[]
  requirements?: {
    gold?: number
    health?: number
  }
  disabled?: boolean
  disabledReason?: string
}

export interface GameEvent {
  id: string
  title: string
  description: string
  choices: EventChoice[]
  rarity?: 'common' | 'uncommon' | 'rare'
}
