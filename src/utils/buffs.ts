/**
 * Buff and debuff utilities
 */

import type { Buff, Character, Enemy } from '@/types'

export enum BuffType {
  STRENGTH = 'strength',
  DEXTERITY = 'dexterity',
  VULNERABLE = 'vulnerable',
  WEAK = 'weak',
  FRAIL = 'frail',
  RAGE = 'rage'
}

export function createBuff(
  type: BuffType,
  value: number,
  duration: number
): Buff {
  const isPositive = [BuffType.STRENGTH, BuffType.DEXTERITY, BuffType.RAGE].includes(type)

  return {
    id: `${type}_${Date.now()}`,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    description: getBuffDescription(type),
    value,
    duration,
    type: isPositive ? 'positive' : 'negative'
  }
}

function getBuffDescription(type: BuffType): string {
  switch (type) {
    case BuffType.STRENGTH:
      return 'Increases attack damage'
    case BuffType.DEXTERITY:
      return 'Increases block gained'
    case BuffType.VULNERABLE:
      return 'Takes 50% more damage'
    case BuffType.WEAK:
      return 'Deal 25% less attack damage'
    case BuffType.FRAIL:
      return 'Gain 25% less block'
    case BuffType.RAGE:
      return 'Gain temporary Strength'
    default:
      return ''
  }
}

export function addBuff(target: Character | Enemy, buff: Buff): void {
  // Check if buff already exists
  const existingBuff = target.buffs.find(b => b.name === buff.name)

  if (existingBuff) {
    // Stack the buff
    existingBuff.value += buff.value
    existingBuff.duration = Math.max(existingBuff.duration, buff.duration)
  } else {
    // Add new buff
    target.buffs.push(buff)
  }
}

export function removeBuff(target: Character | Enemy, buffType: BuffType): void {
  const index = target.buffs.findIndex(b => b.name === buffType)
  if (index !== -1) {
    target.buffs.splice(index, 1)
  }
}

export function hasBuff(target: Character | Enemy, buffType: BuffType): boolean {
  return target.buffs.some(b => b.name === buffType)
}

export function getBuffValue(target: Character | Enemy, buffType: BuffType): number {
  const buff = target.buffs.find(b => b.name === buffType)
  return buff?.value || 0
}

export function calculateDamage(
  baseDamage: number,
  attacker: Character | Enemy,
  defender: Character | Enemy
): number {
  let finalDamage = baseDamage

  // Apply Strength (positive)
  const strength = getBuffValue(attacker, BuffType.STRENGTH)
  if (strength > 0) {
    finalDamage += strength
  }

  // Apply Weak (negative)
  const weak = getBuffValue(attacker, BuffType.WEAK)
  if (weak > 0) {
    finalDamage = Math.floor(finalDamage * 0.75)
  }

  // Apply Vulnerable on defender
  const vulnerable = getBuffValue(defender, BuffType.VULNERABLE)
  if (vulnerable > 0) {
    finalDamage = Math.floor(finalDamage * 1.5)
  }

  return Math.max(0, finalDamage)
}

export function calculateBlock(baseBlock: number, target: Character | Enemy): number {
  let finalBlock = baseBlock

  // Apply Dexterity
  const dexterity = getBuffValue(target, BuffType.DEXTERITY)
  if (dexterity > 0) {
    finalBlock += dexterity
  }

  // Apply Frail
  const frail = getBuffValue(target, BuffType.FRAIL)
  if (frail > 0) {
    finalBlock = Math.floor(finalBlock * 0.75)
  }

  return Math.max(0, finalBlock)
}

export function processEndOfTurnBuffs(target: Character | Enemy): void {
  // Decrease buff durations
  target.buffs = target.buffs.filter(buff => {
    buff.duration--
    return buff.duration > 0
  })

  // Remove temporary Strength (Rage)
  if (hasBuff(target, BuffType.RAGE)) {
    const rageValue = getBuffValue(target, BuffType.RAGE)
    removeBuff(target, BuffType.RAGE)

    // Reduce Strength by rage amount
    const strengthBuff = target.buffs.find(b => b.name === BuffType.STRENGTH)
    if (strengthBuff) {
      strengthBuff.value -= rageValue
      if (strengthBuff.value <= 0) {
        removeBuff(target, BuffType.STRENGTH)
      }
    }
  }
}
