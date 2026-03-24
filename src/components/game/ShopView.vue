<template>
  <div class="shop-view min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 p-4 flex flex-col">
    <!-- Header -->
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-amber-100 mb-2">Merchant</h1>
      <div class="flex items-center justify-center gap-2 text-amber-200">
        <span class="text-xl">💰</span>
        <span class="text-lg font-semibold">{{ gameStore.gold }} Gold</span>
      </div>
    </div>

    <!-- Shop Cards -->
    <div class="flex-1 flex flex-col justify-center gap-3 max-w-md mx-auto w-full pb-4">
      <div
        v-for="item in shopItems"
        :key="item.card.id"
        class="shop-card bg-gradient-to-br from-amber-800 to-amber-900 rounded-xl p-3
               border-2 transition-all duration-200"
        :class="{
          'border-amber-600': !item.purchased && canAfford(item),
          'border-red-900 opacity-60': !item.purchased && !canAfford(item),
          'border-green-700 opacity-50': item.purchased
        }"
      >
        <!-- Card Header -->
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-base font-bold text-amber-100">{{ item.card.name }}</h3>
              <div
                class="px-2 py-0.5 rounded text-xs font-semibold"
                :class="{
                  'bg-yellow-700 text-yellow-100': item.card.rarity === 'rare',
                  'bg-purple-700 text-purple-100': item.card.rarity === 'uncommon',
                  'bg-slate-700 text-slate-100': item.card.rarity === 'common'
                }"
              >
                {{ item.card.rarity }}
              </div>
            </div>
            <p class="text-xs text-amber-300">{{ item.card.type }}</p>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-xl">⚡</span>
            <span class="text-lg font-bold text-amber-200">{{ item.card.cost }}</span>
          </div>
        </div>

        <!-- Card Description -->
        <p class="text-amber-100 text-sm mb-2">{{ item.card.description }}</p>

        <!-- Price and Purchase Button -->
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-1" :class="canAfford(item) ? 'text-amber-200' : 'text-red-400'">
            <span class="text-lg">💰</span>
            <span class="font-semibold">{{ item.price }}</span>
          </div>

          <button
            @click="purchaseCard(item)"
            :disabled="item.purchased || !canAfford(item)"
            class="px-4 py-2 rounded-lg font-semibold text-sm transition-all
                   touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed
                   active:scale-95"
            :class="{
              'bg-amber-700 hover:bg-amber-600 text-amber-100': !item.purchased && canAfford(item),
              'bg-red-900 text-red-300': !item.purchased && !canAfford(item),
              'bg-green-800 text-green-200 cursor-default': item.purchased
            }"
          >
            {{ item.purchased ? 'SOLD' : canAfford(item) ? 'BUY' : 'NO GOLD' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Leave Shop Button -->
    <div class="text-center pb-4">
      <button
        @click="leaveShop"
        class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg
               font-semibold transition-colors active:scale-95 touch-manipulation"
      >
        Leave Shop
      </button>
    </div>

    <!-- Shop Keeper Message -->
    <div class="mt-2 text-center">
      <p class="text-amber-300 text-sm italic">"Welcome, traveler. Take a look at my wares!"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { generateCardRewards } from '@/utils/cardPool'
import type { Card } from '@/types'

const gameStore = useGameStore()

interface ShopItem {
  card: Card
  price: number
  purchased: boolean
}

const shopItems = ref<ShopItem[]>([])

// Generate shop inventory
function generateShopInventory() {
  const cards = generateCardRewards(gameStore.deck, 5)
  shopItems.value = cards.map(card => ({
    card,
    price: calculatePrice(card),
    purchased: false
  }))
}

// Calculate card price based on rarity and floor
function calculatePrice(card: Card): number {
  const basePrices: Record<string, number> = {
    common: 50,
    uncommon: 75,
    rare: 100,
    basic: 30,
    curse: 0,
    status: 0
  }

  const basePrice = basePrices[card.rarity] || 50
  // Slight price variation by floor
  const floorMultiplier = 1 + (gameStore.floor * 0.1)
  return Math.floor(basePrice * floorMultiplier)
}

// Check if player can afford a card
function canAfford(item: ShopItem): boolean {
  return !item.purchased && gameStore.gold >= item.price
}

// Purchase a card
function purchaseCard(item: ShopItem) {
  if (item.purchased || !canAfford(item)) return

  // Deduct gold
  gameStore.gold -= item.price

  // Add card to deck
  gameStore.deck.push({
    ...item.card,
    id: `${item.card.id}_shop_${Date.now()}`
  })

  // Mark as purchased
  item.purchased = true
}

// Leave the shop
function leaveShop() {
  gameStore.onShopEnd()
}

onMounted(() => {
  generateShopInventory()
})
</script>

<style scoped>
.shop-card {
  min-height: 110px;
  touch-action: manipulation;
}

@media (min-width: 640px) {
  .shop-card {
    min-height: 120px;
  }
}
</style>
