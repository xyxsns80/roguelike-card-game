/**
 * Combat system types
 */

import { Card } from './card'

export interface Character {
  name: string
  currentHealth: number
  maxHealth: number
  block: number
  buffs: Buff[]
  image?: string
}

export interface Enemy extends Character {
  intent: EnemyIntent
  ai: EnemyAI
}

export interface EnemyIntent {
  type: 'attack' | 'defend' | 'buff' | 'debuff'
  value: number
  moves: number
}

export type EnemyAI = (enemy: Enemy, player: Character) => EnemyIntent

export interface Buff {
  id: string
  name: string
  description: string
  value: number
  duration: number
  type: 'positive' | 'negative'
}

export interface CombatState {
  player: Character
  enemies: Enemy[]
  turn: number
  phase: 'player' | 'enemy' | 'ended'
  selectedCard: Card | null
  selectedEnemy: number | null
  isPlayerTurn: boolean
}

export interface CombatLogEntry {
  type: 'player' | 'enemy' | 'system'
  message: string
  timestamp: number
}
