<template>
  <div class="game-over-view min-h-screen bg-gradient-to-b from-red-900 to-red-950 p-4 flex flex-col justify-center items-center">
    <!-- Game Over Title -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-red-100 mb-2">Defeat</h1>
      <p class="text-red-200 text-lg">Your journey has ended...</p>
    </div>

    <!-- Stats -->
    <div class="bg-red-800/50 rounded-xl p-6 mb-8 max-w-md w-full border border-red-700">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-3xl font-bold text-red-100">{{ gameStore.floor }}</div>
          <div class="text-sm text-red-300">Floors Cleared</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-red-100">{{ gameStore.gold }}</div>
          <div class="text-sm text-red-300">Gold Earned</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-red-100">{{ gameStore.deck.length }}</div>
          <div class="text-sm text-red-300">Deck Size</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-red-100">{{ gameStore.currentHealth }}/{{ gameStore.maxHealth }}</div>
          <div class="text-sm text-red-300">Final HP</div>
        </div>
      </div>
    </div>

    <!-- Your Deck -->
    <div class="bg-red-800/50 rounded-xl p-4 mb-8 max-w-md w-full border border-red-700">
      <h2 class="text-xl font-bold text-red-100 mb-3">Your Deck</h2>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="card in gameStore.deck"
          :key="card.id"
          class="aspect-square bg-red-900 rounded-lg flex items-center justify-center text-2xl"
          :title="card.name"
        >
          <span v-if="card.type === 'attack'">⚔️</span>
          <span v-else-if="card.type === 'skill'">🛡️</span>
          <span v-else>✨</span>
        </div>
      </div>
    </div>

    <!-- Restart Button -->
    <button
      @click="restart"
      class="px-8 py-4 bg-red-700 hover:bg-red-600 text-red-100 rounded-lg
             font-bold text-lg transition-all active:scale-95 touch-manipulation
             shadow-lg hover:shadow-xl"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

function restart() {
  gameStore.restartGame()
}
</script>
