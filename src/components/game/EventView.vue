<template>
  <div v-if="event" class="event-view min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 p-4 flex flex-col">
    <!-- Event Card -->
    <div class="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
      <!-- Event Header -->
      <div class="bg-gradient-to-br from-purple-800 to-purple-900 rounded-t-xl p-6 border-2 border-purple-600">
        <div class="flex items-center justify-between mb-3">
          <h1 class="text-2xl font-bold text-purple-100">{{ event.title }}</h1>
          <div
            class="px-3 py-1 rounded-full text-sm font-semibold"
            :class="{
              'bg-slate-700 text-slate-200': event.rarity === 'common',
              'bg-blue-700 text-blue-100': event.rarity === 'uncommon',
              'bg-yellow-700 text-yellow-100': event.rarity === 'rare'
            }"
          >
            {{ event.rarity === 'common' ? '普通' : event.rarity === 'uncommon' ? '罕见' : '稀有' }}
          </div>
        </div>
        <p class="text-purple-100 leading-relaxed">{{ event.description }}</p>
      </div>

      <!-- Player Stats -->
      <div class="bg-purple-800/50 px-4 py-3 border-x-2 border-purple-600">
        <div class="flex justify-around text-sm">
          <div class="flex items-center gap-2 text-purple-200">
            <span class="text-lg">❤️</span>
            <span class="font-semibold">{{ gameStore.currentHealth }}/{{ gameStore.maxHealth }}</span>
          </div>
          <div class="flex items-center gap-2 text-purple-200">
            <span class="text-lg">💰</span>
            <span class="font-semibold">{{ gameStore.gold }}</span>
          </div>
        </div>
      </div>

      <!-- Choices -->
      <div class="bg-gradient-to-br from-purple-800 to-purple-900 rounded-b-xl p-4 border-2 border-t-0 border-purple-600">
        <div class="space-y-3">
          <button
            v-for="choice in event.choices"
            :key="choice.id"
            @click="selectChoice(choice)"
            :disabled="!canSelectChoice(choice)"
            class="w-full text-left px-4 py-3 rounded-lg font-medium transition-all
                   touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed
                   active:scale-95 border-2"
            :class="{
              'bg-purple-700 hover:bg-purple-600 border-purple-500 text-purple-100':
                canSelectChoice(choice) && !selectedChoice,
              'bg-green-700 border-green-500 text-green-100':
                selectedChoice === choice.id,
              'bg-red-900/50 border-red-900 text-red-300 cursor-not-allowed opacity-60':
                !canSelectChoice(choice)
            }"
          >
            <div class="flex justify-between items-start">
              <span class="flex-1">{{ choice.text }}</span>
              <span
                v-if="!canSelectChoice(choice)"
                class="text-xs ml-2 opacity-75"
              >
                {{ getChoiceDisabledReason(choice) }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div
      v-if="showResults"
      class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      @click="closeResults"
    >
      <div
        class="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 max-w-md w-full
               border-2 border-purple-500"
        @click.stop
      >
        <h2 class="text-xl font-bold text-purple-100 mb-4">结果</h2>
        <div class="space-y-3">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="p-3 rounded-lg"
            :class="{
              'bg-green-900/50 border border-green-600': getResultClass(result) === 'positive',
              'bg-red-900/50 border border-red-600': getResultClass(result) === 'negative',
              'bg-slate-700/50 border border-slate-600': getResultClass(result) === 'neutral'
            }"
          >
            <p class="text-purple-100">{{ result.message }}</p>
          </div>
        </div>
        <button
          @click="closeResults"
          class="w-full mt-6 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-purple-100
                 rounded-lg font-semibold transition-colors active:scale-95 touch-manipulation"
        >
          继续
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { generateRandomEvent, processEventRewards, canTakeChoice } from '@/utils/eventGenerator'
import type { GameEvent, EventReward } from '@/types/event'

const gameStore = useGameStore()

const event = ref<GameEvent | null>(null)
const selectedChoice = ref<string | null>(null)
const showResults = ref(false)
const results = ref<EventReward[]>([])

onMounted(() => {
  event.value = generateRandomEvent()
})

function canSelectChoice(choice: any): boolean {
  if (!event.value || selectedChoice.value) return false
  const check = canTakeChoice(choice.id, event.value, gameStore.gold, gameStore.currentHealth)
  return check.canTake
}

function getChoiceDisabledReason(choice: any): string {
  if (!event.value) return ''
  const check = canTakeChoice(choice.id, event.value, gameStore.gold, gameStore.currentHealth)
  return check.reason || ''
}

function selectChoice(choice: any) {
  if (!event.value || !canSelectChoice(choice)) return

  selectedChoice.value = choice.id

  // Process rewards
  results.value = processEventRewards(choice.id, event.value)

  // Apply rewards to game state
  applyRewards(results.value)

  // Show results
  showResults.value = true
}

function applyRewards(rewards: EventReward[]) {
  rewards.forEach(reward => {
    switch (reward.type) {
      case 'gold':
        gameStore.gold += (reward.value || 0)
        break
      case 'health':
        gameStore.currentHealth = Math.max(
          1,
          Math.min(gameStore.maxHealth, gameStore.currentHealth + (reward.value || 0))
        )
        break
      case 'max_health':
        gameStore.maxHealth += (reward.value || 0)
        gameStore.currentHealth += (reward.value || 0)
        break
    }
  })
}

function getResultClass(reward: EventReward): string {
  if (reward.type === 'none') return 'neutral'

  const value = reward.value || 0
  if (reward.type === 'health' || reward.type === 'max_health') {
    return value > 0 ? 'positive' : 'negative'
  }
  if (reward.type === 'gold') {
    return value > 0 ? 'positive' : 'negative'
  }
  return 'neutral'
}

function closeResults() {
  gameStore.onEventEnd()
}
</script>

<style scoped>
.event-view {
  touch-action: manipulation;
}
</style>
