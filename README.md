# Roguelike Card Game

A mobile-first roguelike card game built with Vue 3, TypeScript, and Tailwind CSS, inspired by Slay the Spire.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework

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
   - Ironclad character with starter deck (10 cards: 4x Strike, 4x Defend, 1x Bash)
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
│       └── CombatView.vue      # Main combat UI
├── data/
│   ├── cards/
│   │   └── ironclad_cards.ts   # Ironclad card definitions
│   └── enemies/
│       └── starter_enemies.ts  # Starter enemy definitions
├── stores/
│   └── combat.ts               # Combat state management
├── types/
│   ├── card.ts                 # Card type definitions
│   ├── combat.ts               # Combat type definitions
│   └── index.ts                # Type exports
├── utils/
│   └── cardEffectProcessor.ts  # Card effect resolution
├── App.vue                     # Root component
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

### Phase 2: Enhanced Combat
- [ ] Card upgrades
- [ ] Potions system
- [ ] Relics system
- [ ] More card effects (buffs, debuffs)
- [ ] Multi-enemy encounters

### Phase 3: Map System
- [ ] Node-based map progression
- [ ] Event encounters
- [ ] Rest sites
- [ ] Shop system

### Phase 4: Content Expansion
- [ ] More characters
- [ ] More cards
- [ ] More enemies
- [ ] Boss encounters

### Phase 5: Polish
- [ ] Animations
- [ ] Sound effects
- [ ] Card images
- [ ] PWA support
- [ ] Performance optimization

## Contributing

This is a personal project for learning and development. Feel free to fork and modify for your own use.

## License

ISC
