<template>
  <div class="reward-view min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 p-4 flex flex-col">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-amber-100 mb-2">Victory!</h1>
      <p class="text-amber-200">Choose a card to add to your deck</p>
    </div>

    <!-- Card Rewards -->
    <div class="flex-1 flex flex-col justify-center gap-4 max-w-md mx-auto w-full">
      <div
        v-for="card in gameStore.availableRewards"
        :key="card.id"
        @click="selectCard(card)"
        class="reward-card bg-gradient-to-br from-amber-800 to-amber-900 rounded-xl p-4 cursor-pointer
               transform transition-all duration-200 hover:scale-105 hover:shadow-2xl
               border-2 border-amber-600 hover:border-amber-400 active:scale-95"
        :class="{
          'from-yellow-700 to-yellow-800 border-yellow-500': card.rarity === 'rare',
          'from-purple-700 to-purple-800 border-purple-500': card.rarity === 'uncommon'
        }"
      >
        <!-- Card Header -->
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold text-amber-100">{{ card.name }}</h3>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⚡</span>
            <span class="text-xl font-bold text-amber-200">{{ card.cost }}</span>
          </div>
        </div>

        <!-- Card Type -->
        <div class="text-xs uppercase tracking-wide text-amber-300 mb-2">
          {{ card.type }} • {{ card.rarity }}
        </div>

        <!-- Card Description -->
        <p class="text-amber-100 text-sm leading-relaxed">{{ card.description }}</p>

        <!-- Card Stats -->
        <div class="mt-3 flex gap-4 text-xs text-amber-300">
          <div v-if="card.effects.some(e => e.type === 'damage')" class="flex items-center gap-1">
            <span>⚔️</span>
            <span>Attack</span>
          </div>
          <div v-if="card.effects.some(e => e.type === 'block')" class="flex items-center gap-1">
            <span>🛡️</span>
            <span>Defense</span>
          </div>
          <div v-if="card.effects.some(e => e.type === 'heal')" class="flex items-center gap-1">
            <span>💚</span>
            <span>Heal</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Skip Button -->
    <div class="mt-6 text-center">
      <button
        @click="skipReward"
        class="px-6 py-3 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-lg
               font-semibold transition-colors active:scale-95 touch-manipulation"
      >
        Skip Reward
      </button>
    </div>

    <!-- Stats -->
    <div class="mt-4 text-center text-amber-200 text-sm">
      Floor {{ gameStore.floor }} • Deck: {{ gameStore.deck.length }} cards
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import type { Card } from '@/types'

const gameStore = useGameStore()

function selectCard(card: Card) {
  gameStore.selectReward(card)
}

function skipReward() {
  gameStore.skipReward()
}
</script>

<style scoped>
.reward-card {
  min-height: 120px;
  touch-action: manipulation;
}

@media (min-width: 640px) {
  .reward-card {
    min-height: 140px;
  }
}
</style>
