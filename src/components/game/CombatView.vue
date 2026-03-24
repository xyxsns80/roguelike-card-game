<template>
  <div class="combat-view w-full h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 relative">
    <!-- Damage Numbers -->
    <div
      v-for="(popup, index) in damagePopups"
      :key="index"
      class="damage-popup-container absolute inset-0 pointer-events-none"
    >
      <DamageNumber
        v-if="popup.show"
        :value="popup.value"
        :type="popup.type"
        :x="popup.x"
        :y="popup.y"
      />
    </div>

    <!-- Top Bar: Player Stats -->
    <div class="top-bar bg-slate-950 p-4 flex justify-between items-center border-b-2 border-slate-700">
      <div class="player-stats flex items-center gap-4">
        <div class="health-bar flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm">❤</div>
          <div class="text-sm">
            <span class="text-red-400 font-bold">{{ player.currentHealth }}</span>
            <span class="text-slate-500">/</span>
            <span class="text-slate-400">{{ player.maxHealth }}</span>
          </div>
        </div>

        <div v-if="player.block > 0" class="block-bar flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">🛡</div>
          <span class="text-blue-400 font-bold text-sm">{{ player.block }}</span>
        </div>

        <div class="energy-bar flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm">⚡</div>
          <div class="text-sm">
            <span class="text-yellow-400 font-bold">{{ energy }}</span>
            <span class="text-slate-500">/</span>
            <span class="text-slate-400">{{ maxEnergy }}</span>
          </div>
        </div>
      </div>

      <div class="turn-info text-slate-400 text-sm">
        Turn: {{ turn }}
      </div>
    </div>

    <!-- Main Combat Area -->
    <div class="combat-area flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <!-- Enemies Section -->
      <div class="enemies-section flex justify-center gap-4 flex-wrap">
        <div
          v-for="(enemy, index) in aliveEnemies"
          :key="index"
          @click="selectEnemy(index)"
          :class="['enemy-card card bg-slate-800 rounded-lg p-4 cursor-pointer border-2 transition-all min-w-[150px] relative', {
            'border-yellow-500 shadow-lg shadow-yellow-500/30': isTargetingMode,
            'border-green-500 shadow-lg shadow-green-500/30': selectedEnemy === index,
            'border-slate-700 hover:border-slate-500': !isTargetingMode && selectedEnemy !== index
          }]"
        >
          <!-- Targeting indicator -->
          <div v-if="isTargetingMode" class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            →
          </div>

          <div class="enemy-name text-center font-bold text-slate-200 mb-2">{{ enemy.name }}</div>

          <div class="enemy-health mb-2">
            <div class="flex justify-between text-xs text-slate-400 mb-1">
              <span>HP</span>
              <span>{{ enemy.currentHealth }}/{{ enemy.maxHealth }}</span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-3">
              <div
                class="bg-red-600 h-3 rounded-full transition-all"
                :style="{ width: `${(enemy.currentHealth / enemy.maxHealth) * 100}%` }"
              ></div>
            </div>
          </div>

          <div v-if="enemy.block > 0" class="enemy-block mb-2 flex items-center gap-2 text-xs">
            <span class="text-blue-400">🛡 {{ enemy.block }}</span>
          </div>

          <div class="enemy-intent text-center text-xs text-slate-400">
            <div>Intent:</div>
            <div class="font-bold" :class="{
              'text-red-400': enemy.intent.type === 'attack',
              'text-blue-400': enemy.intent.type === 'defend'
            }">
              {{ enemy.intent.type }} ({{ enemy.intent.value }})
            </div>
          </div>
        </div>
      </div>

      <!-- Targeting mode indicator -->
      <div v-if="isTargetingMode" class="targeting-indicator bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-3 text-center animate-pulse">
        <div class="text-yellow-400 font-bold">Select a target!</div>
        <div class="text-xs text-yellow-300">Using: {{ selectedCard?.name }}</div>
      </div>

      <!-- Combat Log -->
      <div class="combat-log bg-slate-950 rounded-lg p-3 h-24 overflow-y-auto">
        <div
          v-for="(log, index) in recentCombatLog"
          :key="index"
          :class="['text-xs mb-1', {
            'text-green-400': log.type === 'player',
            'text-red-400': log.type === 'enemy',
            'text-slate-400': log.type === 'system'
          }]"
        >
          {{ log.message }}
        </div>
      </div>
    </div>

    <!-- Hand Section -->
    <div class="hand-section bg-slate-950 p-4 border-t-2 border-slate-700 relative">
      <!-- Cancel targeting button -->
      <div v-if="isTargetingMode" class="absolute top-2 right-2 z-20">
        <button
          @click="cancelTargeting"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          ✕ Cancel
        </button>
      </div>
      <div class="hand-cards flex justify-center gap-3 overflow-x-auto pb-2 px-2">
        <div
          v-for="(card, index) in hand"
          :key="index"
          @click="playCard(card)"
          @touchstart.prevent="handleCardTouchStart(card, index)"
          @touchend.prevent="handleCardTouchEnd"
          :class="['card card-item bg-slate-800 rounded-xl p-4 cursor-pointer border-2 transition-all min-w-[110px] max-w-[130px] shadow-lg', {
            'border-slate-700 opacity-50': energy < card.cost,
            'border-green-500 shadow-lg shadow-green-500/30': selectedCard?.id === card.id,
            'border-slate-600 hover:border-yellow-500 hover:scale-105': energy >= card.cost && selectedCard?.id !== card.id
          }]"
        >
          <div class="card-cost absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold text-sm shadow-md border-2 border-red-400">
            {{ card.cost }}
          </div>

          <!-- Selected indicator -->
          <div v-if="selectedCard?.id === card.id" class="absolute -top-3 -right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
            ✓
          </div>

          <div class="card-name text-center font-bold text-sm mb-2 mt-3">{{ card.name }}</div>
          <div class="card-description text-xs text-slate-300 text-center leading-tight mb-2">{{ card.description }}</div>

          <div class="card-type text-xs mt-2 text-center">
            <span :class="{
              'text-red-400': card.type === 'attack',
              'text-blue-400': card.type === 'skill',
              'text-purple-400': card.type === 'power'
            }">
              {{ card.type.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Draw/Discard Piles Info -->
      <div class="piles-info flex justify-center gap-6 mt-3 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span class="text-lg">📚</span>
          <span>Draw: {{ deck.drawPile.length }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg">🗑️</span>
          <span>Discard: {{ deck.discardPile.length }}</span>
        </div>
      </div>
    </div>

    <!-- End Turn Button -->
    <div class="end-turn-section p-4 bg-slate-900 flex justify-center">
      <button
        @click="endTurn"
        :disabled="!isPlayerTurn"
        class="end-turn-btn bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg min-w-[120px] min-h-[48px] transition-colors"
      >
        End Turn
      </button>
    </div>

    <!-- Game Over Overlay -->
    <div v-if="isCombatOver" class="game-over-overlay fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="game-over-content bg-slate-800 rounded-lg p-8 text-center">
        <h2 class="text-3xl font-bold mb-4" :class="playerWon ? 'text-green-400' : 'text-red-400'">
          {{ playerWon ? 'Victory!' : 'Defeat' }}
        </h2>
        <button
          @click="restartCombat"
          class="restart-btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg min-w-[120px] min-h-[48px] transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useCombatStore } from '@/stores/combat'
import { createStarterDeck } from '@/data/cards/ironclad_cards'
import { getRandomEncounters } from '@/data/enemies/starter_enemies'
import DamageNumber from './DamageNumber.vue'
import type { Card } from '@/types'

const combatStore = useCombatStore()

// Computed properties from store
const player = computed(() => combatStore.player)
const enemies = computed(() => combatStore.enemies)
const turn = computed(() => combatStore.turn)
const energy = computed(() => combatStore.energy)
const maxEnergy = computed(() => combatStore.maxEnergy)
const deck = computed(() => combatStore.deck)
const combatLog = computed(() => combatStore.combatLog)
const isPlayerTurn = computed(() => combatStore.isPlayerTurn)
const isCombatOver = computed(() => combatStore.isCombatOver)
const playerWon = computed(() => combatStore.playerWon)

// Local state
const selectedEnemy = ref<number | null>(null)
const touchedCard = ref<{ card: Card; index: number } | null>(null)
const touchStartTime = ref(0)
const selectedCard = ref<Card | null>(null)
const isTargetingMode = ref(false)

// Damage popups
interface DamagePopup {
  show: boolean
  value: number
  type: 'damage' | 'block' | 'heal'
  x: number
  y: number
}

const damagePopups = ref<DamagePopup[]>([])

// Computed helpers
const aliveEnemies = computed(() => enemies.value.filter(e => e.currentHealth > 0))
const hand = computed(() => deck.value.hand)
const recentCombatLog = computed(() => combatLog.value.slice(-5))

// Watch combat log for damage events and trigger popups
watch(combatLog, (newLogs) => {
  if (newLogs.length > 0) {
    const latestLog = newLogs[newLogs.length - 1]

    // Parse combat log to extract damage numbers and trigger popups
    const damageMatch = latestLog.message.match(/took (\d+) damage/)
    const blockMatch = latestLog.message.match(/Gained (\d+) block/)
    const healMatch = latestLog.message.match(/Healed (\d+) HP/)

    if (damageMatch) {
      const value = parseInt(damageMatch[1])
      // Show popup at center of screen for now
      showDamagePopup(value, 'damage', window.innerWidth / 2 - 50, window.innerHeight / 2 - 100)
    } else if (blockMatch) {
      const value = parseInt(blockMatch[1])
      showDamagePopup(value, 'block', window.innerWidth / 2 - 50, window.innerHeight / 2 - 100)
    } else if (healMatch) {
      const value = parseInt(healMatch[1])
      showDamagePopup(value, 'heal', 100, 100)
    }
  }
}, { deep: true })

function showDamagePopup(value: number, type: 'damage' | 'block' | 'heal', x: number, y: number) {
  const popup: DamagePopup = {
    show: true,
    value,
    type,
    x,
    y
  }
  damagePopups.value.push(popup)

  // Remove popup after animation
  setTimeout(() => {
    const index = damagePopups.value.indexOf(popup)
    if (index !== -1) {
      damagePopups.value.splice(index, 1)
    }
  }, 1000)
}

// Actions
function handleCardTouchStart(card: Card, index: number) {
  touchStartTime.value = Date.now()
  touchedCard.value = { card, index }
}

function handleCardTouchEnd() {
  const touchDuration = Date.now() - touchStartTime.value

  // If it's a short tap (less than 300ms), treat as click
  if (touchDuration < 300 && touchedCard.value) {
    playCard(touchedCard.value.card)
  }

  touchedCard.value = null
}

function selectEnemy(index: number) {
  if (!isPlayerTurn.value) return

  if (isTargetingMode.value && selectedCard.value) {
    // Play the selected card on the targeted enemy
    combatStore.playCard(selectedCard.value, index)
    selectedCard.value = null
    isTargetingMode.value = false
    selectedEnemy.value = null
  } else {
    // Check if we have a card that requires targeting
    const targetableCards = hand.value.filter(card =>
      card.target === 'enemy' || card.target === 'all_enemies'
    )

    if (targetableCards.length > 0) {
      selectedEnemy.value = index
      // Auto-play the first targetable card
      const card = targetableCards[0]
      combatStore.playCard(card, index)
    }
  }
}

function playCard(card: Card) {
  if (!isPlayerTurn.value) return

  // Check if player has enough energy
  if (energy.value < card.cost) return

  if (card.target === 'enemy') {
    // Need to select an enemy first
    if (aliveEnemies.value.length === 1) {
      combatStore.playCard(card, 0)
    } else {
      // Enter targeting mode
      selectedCard.value = card
      isTargetingMode.value = true
    }
  } else if (card.target === 'all_enemies') {
    // Damage all enemies (no targeting needed)
    combatStore.playCard(card, 0)
  } else {
    // Self-targeted card
    combatStore.playCard(card)
  }
}

function cancelTargeting() {
  selectedCard.value = null
  isTargetingMode.value = false
  selectedEnemy.value = null
}

function endTurn() {
  if (!isPlayerTurn.value) return
  combatStore.endTurn()
}

function restartCombat() {
  const starterDeck = createStarterDeck()
  const enemies = getRandomEncounters(1)
  combatStore.initializeCombat(starterDeck, enemies)
}

// Initialize combat on mount
onMounted(() => {
  const starterDeck = createStarterDeck()
  const randomEnemies = getRandomEncounters(1)
  combatStore.initializeCombat(starterDeck, randomEnemies)
})
</script>

<style scoped>
.combat-view {
  max-width: 600px;
  margin: 0 auto;
}

.card-item {
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.card-cost {
  position: absolute;
  top: -12px;
  left: -12px;
  z-index: 10;
}

/* Mobile-friendly scrolling */
.hand-cards {
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 1rem;
}

.hand-cards > * {
  scroll-snap-align: center;
  flex-shrink: 0;
}

/* Touch-friendly tap targets */
button, .card {
  min-width: 48px;
  min-height: 48px;
}

/* Enhanced card hover effects */
@media (hover: hover) {
  .card-item:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
}

/* Active state for touch */
.card-item:active {
  transform: scale(0.95);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .hand-cards {
    gap: 0.75rem;
  }

  .card-item {
    min-width: 100px;
    max-width: 120px;
  }
}

/* Prevent text selection during gameplay */
.combat-view {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
