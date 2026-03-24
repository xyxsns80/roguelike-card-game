# Roguelike Card Game Development

## Project Goal
开发手机肉鸽卡牌游戏（类似杀戮尖塔）

## Tech Stack
- Vue 3 + TypeScript + Vite
- Pinia for state management
- Tailwind CSS for styling

## Current Phase
Phase 1: Foundation & Core Combat

### Tasks to Complete:
1. Initialize Vue 3 + TypeScript + Vite project
2. Create type definitions for game systems
3. Implement Pinia stores
4. Build card effect processor
5. Create starter cards and enemies
6. Build core combat UI

## Design Decisions (Already Made):
- UI: Tailwind CSS (快速开发)
- PWA: 后期添加
- MVP: 完整战斗系统
- Mobile-first design (375px-428px screens)
- Touch-friendly UI (48px min touch targets)
- 60fps performance target

## Critical Files to Build:
1. `src/types/card.ts` - Card system interfaces
2. `src/stores/combat.ts` - Combat state machine
3. `src/utils/cardEffectProcessor.ts` - Card effect resolution
4. `src/components/game/CombatView.vue` - Main combat UI
5. `src/data/cards/ironclad_cards.ts` - First character's cards

## Instructions
- Continue from where you left off
- Implement features systematically
- Test each component before moving on
- Keep mobile-first design in mind
- Focus on getting playable combat loop first
