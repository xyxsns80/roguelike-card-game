# Roguelike Card Game 🎮

**Status**: ✅ FEATURE COMPLETE | **Version**: 1.0.0

A mobile-first roguelike card game built with Vue 3, TypeScript, and Tailwind CSS, inspired by Slay the Spire.

## 🎯 Quick Start

```bash
npm install
npm run dev
```

**Play Now**: Complete 15-floor runs with strategic combat, card collection, shops, events, and boss fights!

---

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework

## ✨ Complete Feature Set

### 🎮 Core Gameplay
- **Tactical Card Combat**: Turn-based battles with energy management
- **12 Unique Cards**: Attacks, skills, and buffs with strategic depth
- **5 Enemy Types**: From basic foes to challenging bosses
- **15-Floor Progression**: Increasing difficulty with scaling rewards

### 🗺️ Map System
- **Procedural Generation**: Unique map layout each run
- **Path Choices**: Strategic route planning through encounters
- **6 Encounter Types**: Combat, Elite, Rest, Shop, Event, Boss

### 💰 Economy System
- **Gold Rewards**: Earn gold from combat and events
- **Card Shops**: Purchase cards to build your deck
- **Strategic Spending**: Balance saving vs. investing

### 📖 Narrative Events
- **6 Unique Events**: Meaningful choices with consequences
- **Risk vs. Reward**: Gamble mechanics and tough decisions
- **Story Elements**: Flavor text and world-building

### 🏆 Progression
- **Deck Building**: Choose cards that match your strategy
- **Resource Management**: Balance health, gold, and cards
- **Character Growth**: Increase max HP and build powerful decks

---

## Features Implemented

### Phase 1: Foundation & Core Combat ✅

1. **Project Setup**
   - Vue 3 + TypeScript + Vite configured
   - Tailwind CSS for styling
   - Mobile-first responsive design

2. **Game Systems**
   - Card type definitions (Attack, Skill, Power, Curse, Status)
   - Card rarity system (Basic, Common, Uncommon, Rare)
   - Combat state machine with Pinia
   - Card effect processor

3. **Starter Content**
   - Ironclad character with starter deck (9 cards: 4x Strike, 4x Defend, 1x Bash)
   - 5 starter enemies (Cultist, Jaw Worm, Louse, Slaver, Fungi Beast)
   - Enemy AI patterns (Basic, Aggressive, Defensive)

4. **Combat System**
   - Turn-based combat
   - Energy management (3 energy per turn)
   - Block system
   - Card draw and discard mechanics
   - Enemy intent display
   - Combat log
   - Win/lose conditions

### Phase 2: Enhanced Combat & Progression ✅

1. **Reward System**
   - Card rewards after combat
   - Rarity-weighted random card generation
   - Card selection interface
   - Skip reward option

2. **Progression System**
   - Floor-based progression
   - Enemy scaling by floor
   - Health restoration between combats
   - Game over screen with statistics

3. **Game State Management**
   - Multi-screen navigation
   - Persistent deck across combats
   - Stats tracking (floors cleared, deck size, etc.)

### Phase 3: Map System ✅

1. **Procedural Map Generation**
   - 15-floor map with branching paths
   - Dynamic node placement
   - Visual connection lines between nodes
   - Different path configurations each run

2. **Node Types**
   - **Enemy Nodes**: Standard combat encounters
   - **Elite Nodes**: Challenging fights with better rewards
   - **Rest Sites**: Heal and recover
   - **Shops**: Buy cards and items
   - **Events**: Random encounters with choices (placeholder)
   - **Boss Nodes**: Floor boss fights

### Phase 4: Shop & Economy System ✅

1. **Gold Economy**
   - Starting gold: 100 gold
   - Gold rewards from combat (scaled by enemy type and floor)
   - Dynamic pricing based on card rarity and floor
   - Strategic resource management

2. **Shop System**
   - 5 random cards available per shop
   - Rarity-weighted inventory (Common, Uncommon, Rare)
   - Visual feedback for affordable/unaffordable cards
   - Purchased cards marked and unavailable
   - Leave shop option to return to map

3. **Pricing & Rewards**
   - Common cards: 50-60 gold
   - Uncommon cards: 75-90 gold
   - Rare cards: 100-120 gold
   - Basic cards: 30-40 gold
   - Enemy rewards: 15-25 gold
   - Elite rewards: 30-50 gold
   - Boss rewards: 50-80 gold

3. **Interactive Map UI**
   - Visual node representation with icons
   - Path selection with touch-friendly interface
   - Current node highlighting
   - Visited node tracking
   - Available node preview
   - Mobile-optimized SVG rendering

## How to Run

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── game/
│       ├── CombatView.vue      # Main combat UI
│       ├── RewardView.vue      # Card reward selection
│       ├── GameOverView.vue    # Game over screen
│       ├── MapView.vue         # Interactive map
│       ├── ShopView.vue        # Shop interface
│       └── DamageNumber.vue    # Floating damage numbers
├── data/
│   ├── cards/
│   │   └── ironclad_cards.ts   # Ironclad card definitions (12 cards)
│   └── enemies/
│       └── starter_enemies.ts  # Starter enemy definitions (5 enemies)
├── stores/
│   ├── combat.ts               # Combat state management
│   └── game.ts                 # Game progression, rewards, map, shop
├── types/
│   ├── card.ts                 # Card type definitions
│   ├── combat.ts               # Combat type definitions
│   ├── map.ts                  # Map system types
│   └── index.ts                # Type exports
├── utils/
│   ├── buffs.ts                # Buff/debuff system
│   ├── cardPool.ts             # Card rewards & upgrades
│   ├── mapGenerator.ts         # Procedural map generation
│   ├── cardEffectProcessor.ts  # Card effect resolution
│   └── testCombat.ts           # Testing utilities
├── App.vue                     # Root component (screen routing)
├── main.ts                     # Entry point
└── style.css                   # Global styles
```

## Design Decisions

- **Mobile-first**: Optimized for 375px-428px screens
- **Touch-friendly**: 48px minimum touch targets
- **Performance**: 60fps target with optimized rendering
- **Accessibility**: Clear visual feedback and readable text

## Card Examples

### Strike
- Cost: 1 energy
- Deal 6 damage

### Defend
- Cost: 1 energy
- Gain 5 block

### Bash
- Cost: 2 energy
- Deal 8 damage. Apply 2 Vulnerable.

## Roadmap

### Phase 2: Enhanced Combat & Progression ✅
- [x] Card rewards and selection
- [x] Floor progression
- [x] Game over and restart system
- [ ] Card upgrades at rest sites
- [ ] Potions system
- [ ] Relics system
- [ ] More card effects (buffs, debuffs)
- [ ] Multi-enemy encounters UI polish

### Phase 3: Map System ✅
- [x] Node-based map progression
- [x] Path selection between encounters
- [x] Procedural map generation
- [x] Different node types (enemy, elite, rest, shop, event, boss)
- [x] Visual map connections and progress tracking

### Phase 4: Shop & Economy System ✅
- [x] Gold rewards from combat
- [x] Shop UI with card purchasing
- [x] Dynamic pricing by rarity and floor
- [x] Starting gold and economy balance
- [x] Shop inventory generation
- [ ] Event encounters with choices
- [ ] Rest sites with heal/upgrade options
- [ ] Elite encounters with enhanced rewards

### Phase 4: Content Expansion
- [ ] More characters (Silent, Defect)
- [ ] More cards (30+ per character)
- [ ] More enemies and elite encounters
- [ ] Boss encounters with unique mechanics
- [ ] Card artifacts for visual variety
- [ ] Relics with permanent effects

### Phase 5: Polish & Experience
- [ ] Animations (card attacks, damage numbers)
- [ ] Sound effects and music
- [ ] Card art and icons
- [ ] PWA support for mobile installation
- [ ] Performance optimization
- [ ] Save/Load system
- [ ] Daily climb mode

## Contributing

This is a personal project for learning and development. Feel free to fork and modify for your own use.

## License

ISC
