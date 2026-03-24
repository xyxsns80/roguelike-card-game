/**
 * Starter enemies for the game
 */

import type { Enemy, EnemyAI } from '@/types'

/**
 * Simple enemy AI that alternates between attacks and defends
 */
const basicAI: EnemyAI = (enemy) => {
  const turn = Math.random()
  if (turn < 0.7) {
    return {
      type: 'attack',
      value: Math.floor(enemy.maxHealth * 0.15),
      moves: 1
    }
  } else {
    return {
      type: 'defend',
      value: Math.floor(enemy.maxHealth * 0.1),
      moves: 1
    }
  }
}

/**
 * Aggressive AI that attacks more frequently
 */
const aggressiveAI: EnemyAI = (enemy) => {
  return {
    type: 'attack',
    value: Math.floor(enemy.maxHealth * 0.2),
    moves: 1
  }
}

/**
 * Defensive AI that blocks more frequently
 */
const defensiveAI: EnemyAI = (enemy) => {
  const turn = Math.random()
  if (turn < 0.5) {
    return {
      type: 'defend',
      value: Math.floor(enemy.maxHealth * 0.15),
      moves: 1
    }
  } else {
    return {
      type: 'attack',
      value: Math.floor(enemy.maxHealth * 0.12),
      moves: 1
    }
  }
}

export const STARTER_ENEMIES: Enemy[] = [
  {
    name: '邪教徒',
    currentHealth: 48,
    maxHealth: 48,
    block: 0,
    buffs: [],
    intent: {
      type: 'attack',
      value: 6,
      moves: 1
    },
    ai: basicAI
  },
  {
    name: '颚虫',
    currentHealth: 42,
    maxHealth: 42,
    block: 0,
    buffs: [],
    intent: {
      type: 'attack',
      value: 11,
      moves: 1
    },
    ai: aggressiveAI
  },
  {
    name: '虱子',
    currentHealth: 14,
    maxHealth: 14,
    block: 0,
    buffs: [],
    intent: {
      type: 'attack',
      value: 6,
      moves: 1
    },
    ai: basicAI
  },
  {
    name: '奴役者',
    currentHealth: 46,
    maxHealth: 46,
    block: 0,
    buffs: [],
    intent: {
      type: 'attack',
      value: 8,
      moves: 1
    },
    ai: defensiveAI
  },
  {
    name: '真菌野兽',
    currentHealth: 52,
    maxHealth: 52,
    block: 0,
    buffs: [],
    intent: {
      type: 'attack',
      value: 12,
      moves: 1
    },
    ai: basicAI
  }
]

/**
 * Get random enemies for an encounter
 */
export function getRandomEncounters(count: number = 1): Enemy[] {
  const shuffled = [...STARTER_ENEMIES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Get a specific encounter
 */
export function getEncounter(enemyName: string): Enemy {
  const enemy = STARTER_ENEMIES.find(e => e.name === enemyName)
  if (!enemy) {
    throw new Error(`Enemy "${enemyName}" not found`)
  }
  return { ...enemy }
}
