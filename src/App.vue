<template>
  <div id="app" class="w-full h-full">
    <CombatView v-if="gameStore.currentScreen === 'combat'" />
    <RewardView v-else-if="gameStore.currentScreen === 'reward'" />
    <MapView v-else-if="gameStore.currentScreen === 'map'" />
    <ShopView v-else-if="gameStore.currentScreen === 'shop'" />
    <EventView v-else-if="gameStore.currentScreen === 'event'" />
    <GameOverView v-else-if="gameStore.currentScreen === 'gameover'" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CombatView from './components/game/CombatView.vue'
import RewardView from './components/game/RewardView.vue'
import MapView from './components/game/MapView.vue'
import ShopView from './components/game/ShopView.vue'
import EventView from './components/game/EventView.vue'
import GameOverView from './components/game/GameOverView.vue'
import { useGameStore } from './stores/game'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.startGame()
})
</script>
