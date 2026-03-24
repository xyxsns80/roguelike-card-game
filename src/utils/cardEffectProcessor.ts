/**
 * Card effect processor utility
 */

import type { Card, CardEffect, Character, Enemy } from '@/types'

export interface EffectContext {
  player: Character
  enemies: Enemy[]
  targetIndex?: number
  energy: number
}

export interface EffectResult {
  success: boolean
  damage?: number
  block?: number
  heal?: number
  draw?: number
  energy?: number
  message?: string
}

/**
 * Process a single card effect
 */
export function processCardEffect(
  effect: CardEffect,
  context: EffectContext
): EffectResult {
  const result: EffectResult = { success: true }

  switch (effect.type) {
    case 'damage':
      result.damage = processDamageEffect(effect, context)
      result.message = `Dealt ${result.damage} damage`
      break

    case 'block':
      result.block = processBlockEffect(effect, context)
      result.message = `Gained ${result.block} block`
      break

    case 'heal':
      result.heal = processHealEffect(effect, context)
      result.message = `Healed ${result.heal} HP`
      break

    case 'draw':
      result.draw = effect.value || 0
      result.message = `Drew ${result.draw} cards`
      break

    case 'energy':
      result.energy = effect.value || 0
      result.message = `Gained ${result.energy} energy`
      break

    case 'buff':
      processBuffEffect(effect, context)
      result.message = `Applied ${effect.buffType}`
      break

    case 'debuff':
      processDebuffEffect(effect, context)
      result.message = `Applied ${effect.buffType} to enemy`
      break

    default:
      result.success = false
      result.message = 'Unknown effect type'
  }

  return result
}

/**
 * Process damage effect
 */
function processDamageEffect(effect: CardEffect, context: EffectContext): number {
  const { enemies, targetIndex } = context
  let damage = effect.value || 0

  if (effect.target === 'all_enemies') {
    // Damage all enemies
    enemies.forEach(enemy => {
      const actualDamage = calculateDamage(damage, enemy)
      enemy.currentHealth -= actualDamage
      enemy.block = Math.max(0, enemy.block - damage)
    })
    return damage
  } else if (targetIndex !== undefined && enemies[targetIndex]) {
    // Damage single enemy
    const enemy = enemies[targetIndex]
    const actualDamage = calculateDamage(damage, enemy)
    enemy.currentHealth -= actualDamage
    enemy.block = Math.max(0, enemy.block - damage)
    return actualDamage
  }

  return 0
}

/**
 * Process block effect
 */
function processBlockEffect(effect: CardEffect, context: EffectContext): number {
  const { player } = context
  const block = effect.value || 0
  player.block += block
  return block
}

/**
 * Process heal effect
 */
function processHealEffect(effect: CardEffect, context: EffectContext): number {
  const { player } = context
  const heal = effect.value || 0
  player.currentHealth = Math.min(player.maxHealth, player.currentHealth + heal)
  return heal
}

/**
 * Process buff effect
 */
function processBuffEffect(effect: CardEffect, context: EffectContext): void {
  const { player } = context

  if (!effect.buffType || !effect.duration) return

  // Check if buff already exists
  const existingBuff = player.buffs.find(b => b.id === effect.buffType)

  if (existingBuff) {
    // Refresh duration
    existingBuff.duration = effect.duration
  } else {
    // Add new buff
    player.buffs.push({
      id: effect.buffType,
      name: effect.buffType,
      description: `${effect.buffType} buff`,
      value: effect.value || 0,
      duration: effect.duration,
      type: 'positive'
    })
  }
}

/**
 * Process debuff effect
 */
function processDebuffEffect(effect: CardEffect, context: EffectContext): void {
  const { enemies, targetIndex } = context

  if (!effect.buffType || !effect.duration) return
  if (targetIndex === undefined || !enemies[targetIndex]) return

  const enemy = enemies[targetIndex]

  // Check if debuff already exists
  const existingDebuff = enemy.buffs.find(b => b.id === effect.buffType)

  if (existingDebuff) {
    // Refresh duration
    existingDebuff.duration = effect.duration
  } else {
    // Add new debuff
    enemy.buffs.push({
      id: effect.buffType,
      name: effect.buffType,
      description: `${effect.buffType} debuff`,
      value: effect.value || 0,
      duration: effect.duration,
      type: 'negative'
    })
  }
}

/**
 * Calculate actual damage after block
 */
function calculateDamage(damage: number, target: Character): number {
  return Math.max(0, damage - target.block)
}

/**
 * Validate if card can be played
 */
export function canPlayCard(card: Card, context: EffectContext): boolean {
  // Check energy
  if (context.energy < card.cost) {
    return false
  }

  // Check targets for enemy-targeted cards
  if (card.target === 'enemy' || card.target === 'all_enemies') {
    if (context.enemies.length === 0) {
      return false
    }

    if (card.target === 'enemy' && context.targetIndex === undefined) {
      return false
    }
  }

  return true
}

/**
 * Get all valid targets for a card
 */
export function getValidTargets(card: Card, enemies: Enemy[]): number[] {
  if (card.target === 'enemy') {
    return enemies
      .map((_, index) => index)
      .filter(index => enemies[index].currentHealth > 0)
  }

  if (card.target === 'all_enemies') {
    return enemies
      .map((_, index) => index)
      .filter(index => enemies[index].currentHealth > 0)
  }

  return []
}
