/**
 * Combat state management with Pinia
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card, Deck, Character, Enemy, CombatLogEntry } from '@/types'
import { CardType } from '@/types'
import {
  createBuff,
  addBuff,
  calculateDamage,
  calculateBlock,
  processEndOfTurnBuffs,
  BuffType
} from '@/utils/buffs'

export const useCombatStore = defineStore('combat', () => {
  // State
  const player = ref<Character>({
    name: 'Ironclad',
    currentHealth: 80,
    maxHealth: 80,
    block: 0,
    buffs: []
  })

  const enemies = ref<Enemy[]>([])
  const turn = ref(1)
  const phase = ref<'player' | 'enemy' | 'ended'>('player')
  const energy = ref(3)
  const maxEnergy = ref(3)
  const deck = ref<Deck>({
    cards: [],
    drawPile: [],
    hand: [],
    discardPile: [],
    exhaustPile: []
  })
  const combatLog = ref<CombatLogEntry[]>([])

  // Computed
  const isPlayerTurn = computed(() => phase.value === 'player')
  const isCombatOver = computed(() =>
    player.value.currentHealth <= 0 || enemies.value.every(e => e.currentHealth <= 0)
  )
  const playerWon = computed(() =>
    enemies.value.every(e => e.currentHealth <= 0) && player.value.currentHealth > 0
  )

  // Actions
  function initializeCombat(initialDeck: Card[], enemyList: Enemy[]) {
    // Reset player state
    player.value = {
      ...player.value,
      currentHealth: player.value.maxHealth,
      block: 0,
      buffs: []
    }

    // Setup enemies and generate their initial intents
    enemies.value = enemyList.map(enemy => ({
      ...enemy,
      currentHealth: enemy.maxHealth,
      block: 0,
      buffs: [],
      intent: enemy.ai(enemy, player.value) // Generate initial intent
    }))

    // Setup deck
    const deckCards = [...initialDeck]
    shuffleArray(deckCards)

    deck.value = {
      cards: deckCards,
      drawPile: [...deckCards],
      hand: [],
      discardPile: [],
      exhaustPile: []
    }

    // Reset combat state
    turn.value = 1
    phase.value = 'player'
    energy.value = maxEnergy.value
    combatLog.value = []

    addLog('system', 'Combat started!')
    startTurn()
  }

  function startTurn() {
    if (phase.value === 'player') {
      energy.value = maxEnergy.value
      player.value.block = 0

      // Process end of turn buffs
      processEndOfTurnBuffs(player.value)

      // Draw cards
      drawCards(5)
      addLog('system', `Turn ${turn.value}: Your turn`)
    } else {
      enemies.value.forEach(enemy => {
        enemy.block = 0
        // Process end of turn buffs for each enemy
        processEndOfTurnBuffs(enemy)
      })
      addLog('system', `Turn ${turn.value}: Enemy turn`)
    }
  }

  function endTurn() {
    if (phase.value === 'player') {
      // Discard hand
      deck.value.discardPile.push(...deck.value.hand)
      deck.value.hand = []

      phase.value = 'enemy'
      startTurn()
      executeEnemyTurns()
    } else {
      phase.value = 'player'
      turn.value++
      startTurn()
    }
  }

  function drawCards(count: number) {
    for (let i = 0; i < count; i++) {
      if (deck.value.drawPile.length === 0) {
        if (deck.value.discardPile.length === 0) break
        // Shuffle discard pile into draw pile
        shuffleArray(deck.value.discardPile)
        deck.value.drawPile = [...deck.value.discardPile]
        deck.value.discardPile = []
      }

      if (deck.value.drawPile.length > 0) {
        const card = deck.value.drawPile.pop()!
        deck.value.hand.push(card)
      }
    }
  }

  function playCard(card: Card, targetIndex?: number) {
    if (!isPlayerTurn.value || energy.value < card.cost) {
      return false
    }

    energy.value -= card.cost

    // Remove card from hand
    const handIndex = deck.value.hand.findIndex(c => c.id === card.id)
    if (handIndex !== -1) {
      deck.value.hand.splice(handIndex, 1)
    }

    // Process card effects
    processCardEffects(card, targetIndex)

    // Move to discard pile unless it's an exhaust card
    if (card.type !== CardType.CURSE) {
      deck.value.discardPile.push(card)
    } else {
      deck.value.exhaustPile.push(card)
    }

    return true
  }

  function processCardEffects(card: Card, targetIndex?: number) {
    card.effects.forEach(effect => {
      switch (effect.type) {
        case 'damage':
          // Special handling for Body Slam card
          const damage = card.id === 'body_slam' ? player.value.block : (effect.value || 0)

          if (effect.target === 'all_enemies') {
            // Damage all alive enemies
            enemies.value.forEach(enemy => {
              if (enemy.currentHealth > 0) {
                dealDamage(player.value, enemy, damage)
              }
            })
          } else if (targetIndex !== undefined && enemies.value[targetIndex]) {
            dealDamage(player.value, enemies.value[targetIndex], damage)
          }
          break
        case 'block':
          const blockAmount = calculateBlock(effect.value || 0, player.value)
          player.value.block += blockAmount
          addLog('player', `Gained ${blockAmount} block`)
          break
        case 'heal':
          player.value.currentHealth = Math.min(
            player.value.maxHealth,
            player.value.currentHealth + (effect.value || 0)
          )
          addLog('player', `Healed ${effect.value} HP`)
          break
        case 'draw':
          drawCards(effect.value || 0)
          break
        case 'energy':
          energy.value += effect.value || 0
          break
        case 'buff':
          if (effect.buffType && effect.target === 'self') {
            const buff = createBuff(
              effect.buffType as BuffType,
              effect.value || 0,
              effect.duration || 1
            )
            addBuff(player.value, buff)
            addLog('player', `Gained ${buff.name} (${buff.value})`)
          }
          break
        case 'debuff':
          if (effect.buffType && targetIndex !== undefined && enemies.value[targetIndex]) {
            const target = enemies.value[targetIndex]
            const debuff = createBuff(
              effect.buffType as BuffType,
              effect.value || 0,
              effect.duration || 1
            )
            addBuff(target, debuff)
            addLog('player', `${target.name} gained ${debuff.name} (${debuff.value})`)
          }
          break
      }
    })
  }

  function dealDamage(attacker: Character | Enemy, target: Character | Enemy, baseDamage: number) {
    // Calculate damage with buffs/debuffs
    const finalDamage = calculateDamage(baseDamage, attacker, target)
    const actualDamage = Math.max(0, finalDamage - target.block)
    target.block = Math.max(0, target.block - finalDamage)
    target.currentHealth -= actualDamage

    const isPlayer = target === player.value
    addLog(isPlayer ? 'enemy' : 'player',
      `${target.name} took ${actualDamage} damage${target.block > 0 ? ` (${target.block} blocked)` : ''}`)
  }

  function executeEnemyTurns() {
    enemies.value.forEach(enemy => {
      if (enemy.currentHealth > 0) {
        // Execute current intent
        executeEnemyIntent(enemy)

        // Generate intent for next turn (for display)
        enemy.intent = enemy.ai(enemy, player.value)
      }
    })

    // Check if combat is over
    if (isCombatOver.value) {
      phase.value = 'ended'
      if (playerWon.value) {
        addLog('system', 'Victory!')
      } else {
        addLog('system', 'Defeat...')
      }
    } else {
      // Schedule end of enemy turn
      setTimeout(() => endTurn(), 1000)
    }
  }

  function executeEnemyIntent(enemy: Enemy) {
    switch (enemy.intent.type) {
      case 'attack':
        dealDamage(enemy, player.value, enemy.intent.value)
        break
      case 'defend':
        const blockAmount = calculateBlock(enemy.intent.value, enemy)
        enemy.block += blockAmount
        addLog('enemy', `${enemy.name} gained ${blockAmount} block`)
        break
    }
  }

  function addLog(type: CombatLogEntry['type'], message: string) {
    combatLog.value.push({
      type,
      message,
      timestamp: Date.now()
    })
  }

  function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  return {
    // State
    player,
    enemies,
    turn,
    phase,
    energy,
    maxEnergy,
    deck,
    combatLog,

    // Computed
    isPlayerTurn,
    isCombatOver,
    playerWon,

    // Actions
    initializeCombat,
    endTurn,
    playCard,
    drawCards,
    addLog
  }
})
