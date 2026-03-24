/**
 * Game state management (progression, rewards, etc.)
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Card } from '@/types'
import type { MapData, NodeType } from '@/types/map'
import { generateCardRewards, upgradeCard } from '@/utils/cardPool'
import { generateMap } from '@/utils/mapGenerator'
import { createStarterDeck } from '@/data/cards/ironclad_cards'
import { STARTER_ENEMIES } from '@/data/enemies/starter_enemies'
import { useCombatStore } from './combat'

export type GameScreen = 'combat' | 'reward' | 'map' | 'shop' | 'event' | 'gameover'

export const useGameStore = defineStore('game', () => {
  // State
  const currentScreen = ref<GameScreen>('combat')
  const deck = ref<Card[]>(createStarterDeck())
  const availableRewards = ref<Card[]>([])
  const floor = ref(1)
  const gold = ref(0)
  const mapData = ref<MapData | null>(null)
  const currentEnemyType = ref<'enemy' | 'elite' | 'boss'>('enemy')

  // Computed
  const maxHealth = ref(80)
  const currentHealth = ref(80)

  // Actions
  function startGame() {
    deck.value = createStarterDeck()
    floor.value = 1
    gold.value = 100 // Starting gold
    currentHealth.value = maxHealth.value
    mapData.value = generateMap()

    const combatStore = useCombatStore()
    combatStore.initializeCombat(deck.value, [STARTER_ENEMIES[0]])
    currentScreen.value = 'combat'
  }

  function setMapData(data: MapData) {
    mapData.value = data
  }

  function onNodeSelect(nodeType: NodeType) {
    switch (nodeType) {
      case 'enemy':
      case 'elite':
      case 'boss':
        startCombat(nodeType)
        break
      case 'rest':
        handleRestSite()
        break
      case 'shop':
        handleShop()
        break
      case 'event':
        handleEvent()
        break
      case 'start':
        currentScreen.value = 'map'
        break
    }
  }

  function startCombat(enemyType: 'enemy' | 'elite' | 'boss') {
    const combatStore = useCombatStore()

    // Store current enemy type for gold calculation
    currentEnemyType.value = enemyType

    // Select enemy based on floor and type
    let enemyIndex = (floor.value - 1) % STARTER_ENEMIES.length

    if (enemyType === 'elite' || enemyType === 'boss') {
      // Use stronger enemies for elites/bosses
      enemyIndex = Math.min(enemyIndex + 2, STARTER_ENEMIES.length - 1)
    }

    const enemy = { ...STARTER_ENEMIES[enemyIndex] }

    // Scale enemy difficulty
    const healthIncrease = Math.floor(floor.value / 2) * 5
    enemy.maxHealth += healthIncrease

    if (enemyType === 'elite') {
      enemy.maxHealth *= 1.5
    } else if (enemyType === 'boss') {
      enemy.maxHealth *= 2
    }

    combatStore.initializeCombat(deck.value, [enemy])
    currentScreen.value = 'combat'
  }

  function handleRestSite() {
    // For now, just heal and show map
    currentHealth.value = Math.min(maxHealth.value, currentHealth.value + 30)
    currentScreen.value = 'map'
  }

  function handleShop() {
    currentScreen.value = 'shop'
  }

  function handleEvent() {
    currentScreen.value = 'event'
  }

  function onEventEnd() {
    currentScreen.value = 'map'
  }

  function onShopEnd() {
    currentScreen.value = 'map'
  }

  function calculateGoldReward(): number {
    // Base gold by enemy type
    const baseGold = {
      enemy: 15,
      elite: 30,
      boss: 50
    }

    // Floor scaling
    const floorMultiplier = 1 + (floor.value * 0.1)

    // Add some randomness (±20%)
    const randomMultiplier = 0.8 + Math.random() * 0.4

    return Math.floor(baseGold[currentEnemyType.value] * floorMultiplier * randomMultiplier)
  }

  function onCombatEnd(won: boolean) {
    const combatStore = useCombatStore()

    // Update health
    currentHealth.value = combatStore.player.currentHealth

    if (won) {
      // Calculate and add gold reward
      const earnedGold = calculateGoldReward()
      gold.value += earnedGold

      // Generate rewards
      availableRewards.value = generateCardRewards(deck.value, 3)
      currentScreen.value = 'reward'
    } else {
      currentScreen.value = 'gameover'
    }
  }

  function selectReward(card: Card) {
    // Add card to deck
    deck.value.push({ ...card, id: `${card.id}_reward_${floor.value}` })

    // Move to next floor
    floor.value++
    currentScreen.value = 'map'
  }

  function skipReward() {
    // Move to next floor without taking a card
    floor.value++
    currentScreen.value = 'map'
  }

  function upgradeCardInDeck(cardIndex: number) {
    const card = deck.value[cardIndex]
    if (!card.isUpgraded) {
      deck.value[cardIndex] = upgradeCard(card)
    }
  }

  function restartGame() {
    startGame()
  }

  return {
    // State
    currentScreen,
    deck,
    availableRewards,
    floor,
    gold,
    maxHealth,
    currentHealth,
    mapData,

    // Actions
    startGame,
    onCombatEnd,
    selectReward,
    skipReward,
    upgradeCardInDeck,
    restartGame,
    setMapData,
    onNodeSelect,
    onShopEnd,
    onEventEnd
  }
})
