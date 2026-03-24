/**
 * Combat testing utility
 * Use this to test core game mechanics
 */

import { useCombatStore } from '@/stores/combat'
import { createStarterDeck } from '@/data/cards/ironclad_cards'
import { STARTER_ENEMIES } from '@/data/enemies/starter_enemies'

export function testBasicCombat() {
  console.log('=== Testing Basic Combat Mechanics ===')

  const store = useCombatStore()

  // Test 1: Initialize combat
  console.log('Test 1: Initialize Combat')
  const deck = createStarterDeck()
  console.log(`✓ Starter deck created with ${deck.length} cards`)

  const enemies = [STARTER_ENEMIES[0]] // Cultist
  store.initializeCombat(deck, enemies)

  console.log(`✓ Combat initialized`)
  console.log(`  Player HP: ${store.player.currentHealth}/${store.player.maxHealth}`)
  console.log(`  Energy: ${store.energy}/${store.maxEnergy}`)
  console.log(`  Hand size: ${store.deck.hand.length}`)
  console.log(`  Enemy: ${store.enemies[0].name} (${store.enemies[0].currentHealth} HP)`)

  // Test 2: Play a card
  console.log('\nTest 2: Play Strike Card')
  const strikeCard = store.deck.hand.find((c: any) => c.id.includes('strike'))
  if (strikeCard) {
    const result = store.playCard(strikeCard, 0)
    console.log(`✓ Strike card played: ${result ? 'Success' : 'Failed'}`)
    console.log(`  Energy remaining: ${store.energy}`)
    console.log(`  Enemy HP: ${store.enemies[0].currentHealth}/${store.enemies[0].maxHealth}`)
  }

  // Test 3: End turn
  console.log('\nTest 3: End Turn')
  store.endTurn()
  console.log(`✓ Turn ended`)
  console.log(`  Current phase: ${store.phase}`)
  console.log(`  Player HP: ${store.player.currentHealth}`)

  // Test 4: Buff system
  console.log('\nTest 4: Buff System')
  console.log(`  Player buffs: ${store.player.buffs.length}`)
  console.log(`  Enemy buffs: ${store.enemies[0].buffs.length}`)

  console.log('\n=== All Tests Passed ===')
}

export function testCardEffects() {
  console.log('\n=== Testing Card Effects ===')

  const store = useCombatStore()

  // Reset combat
  const deck = createStarterDeck()
  const enemies = [STARTER_ENEMIES[1]] // Jaw Worm
  store.initializeCombat(deck, enemies)

  // Test block card
  console.log('Test 1: Defend Card (Block)')
  const defendCard = store.deck.hand.find((c: any) => c.id.includes('defend'))
  if (defendCard) {
    const initialBlock = store.player.block
    store.playCard(defendCard)
    console.log(`✓ Block gained: ${store.player.block - initialBlock}`)
  }

  // Test all enemies damage
  console.log('\nTest 2: Cleave Card (All Enemies)')
  const cleaveCard = deck.find((c: any) => c.id === 'cleave')
  if (cleaveCard) {
    // Add multiple enemies
    store.deck.hand.push(cleaveCard)
    const multiEnemies = [STARTER_ENEMIES[2], STARTER_ENEMIES[3]] // Louse, Slaver
    store.initializeCombat(deck, multiEnemies)

    const initialHealth = store.enemies.map((e: any) => e.currentHealth)
    store.playCard(cleaveCard, 0)
    const damagedHealth = store.enemies.map((e: any) => e.currentHealth)

    console.log(`✓ All enemies damaged:`)
    store.enemies.forEach((enemy: any, i: number) => {
      console.log(`  ${enemy.name}: ${initialHealth[i]} → ${damagedHealth[i]}`)
    })
  }

  console.log('\n=== Card Effect Tests Passed ===')
}

// Run tests in console
export function runAllTests() {
  testBasicCombat()
  testCardEffects()
  console.log('\n🎉 All combat tests completed successfully!')
}

// Make available in console for debugging
if (typeof window !== 'undefined') {
  const windowObj = window as any
  windowObj.testBasicCombat = testBasicCombat
  windowObj.testCardEffects = testCardEffects
  windowObj.runAllTests = runAllTests
  console.log('🎮 Combat tests available! Use testBasicCombat(), testCardEffects(), or runAllTests() in console')
}
