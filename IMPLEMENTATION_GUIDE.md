# 🐕 Mezcal Runner Game - Implementation Guide

This document guides you through the initial implementation of the Mezcal Runner Game.

## ✨ Project Status

✅ **Phase 1 Complete**: Core Game Engine
- GameEngine class with physics, entities, and collision detection
- Fully functional game mechanics (jumping, spawning, scoring)
- Difficulty scaling system
- Level progression

✅ **Phase 2 Complete**: React Components
- GameContainer orchestrator
- GameCanvas with canvas rendering
- HUD display
- Game state management
- High score persistence

✅ **Phase 3 Complete**: User Interface
- Main menu with instructions
- Game over screen with stats
- Reusable Button component
- Heart life indicator
- Responsive design

✅ **Phase 4 Ready**: Polish & Testing
- TypeScript compilation verified
- Component architecture ready
- Project structure organized
- Agent prompts created

## 🎮 Game Features

### Implemented
- ✅ Dog character that runs automatically
- ✅ Jump mechanics (Spacebar or Up Arrow)
- ✅ 3 starting lives displayed as hearts
- ✅ Poop obstacles that reduce lives by 1
- ✅ Three treat types:
  - Bone: 3 points
  - Kibble: 1 point
  - Heart treat: +1 life (max 10)
- ✅ Automatic speed increase with levels
- ✅ Score-based level progression
- ✅ Game over screen with final stats
- ✅ High score tracking (localStorage)
- ✅ Responsive UI design

### Future Enhancements
- 🎨 Sprite graphics (replace boxes)
- 🔊 Sound effects and background music
- 📊 Proper leaderboard system
- 🎯 Multiple levels/maps
- ⭐ Power-ups
- 🎚️ Difficulty settings
- 📱 Mobile touch controls
- 📈 Analytics

## 📁 Project Structure

```
mezcal-runner-game/
│
├── .agents/                          # Agent automation directory
│   ├── knowledge/                    # Shared knowledge base
│   │   ├── PROJECT_OVERVIEW.md      # Complete project vision
│   │   ├── GAME_MECHANICS.md        # Detailed game rules
│   │   └── ARCHITECTURE.md          # Technical implementation guide
│   │
│   └── prompts/                      # Agent specialization prompts
│       ├── game-logic-agent.md      # For GameEngine/physics
│       ├── components-agent.md      # For React components
│       └── ui-agent.md              # For UI/UX
│
├── components/
│   ├── Game/
│   │   ├── GameContainer.tsx        # Main orchestrator (state)
│   │   ├── GameCanvas.tsx           # Canvas rendering & game loop
│   │   └── HUD.tsx                  # Score/lives/level display
│   ├── UI/
│   │   ├── MainMenu.tsx             # Start screen
│   │   ├── GameOver.tsx             # End screen
│   │   └── Button.tsx               # Reusable button
│   └── Shared/
│       └── Heart.tsx                # Life indicator
│
├── lib/
│   ├── game/
│   │   ├── GameEngine.ts            # Core game logic
│   │   └── constants.ts             # Configuration values
│   └── types.ts                     # Shared TypeScript interfaces
│
├── app/
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Entry point
│   └── globals.css                  # Global styles
│
├── public/                          # Static assets
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── next.config.ts                   # Next.js config
├── tailwind.config.ts               # Tailwind CSS config (auto)
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (via NVM or direct installation)
- npm/yarn package manager
- Modern web browser

### Installation

```bash
# Already done! Dependencies are installed in node_modules/

# To reinstall if needed:
npm install
```

### Development

```bash
# Start development server
npm run dev

# Server runs at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎯 How to Play

1. **Start the Game**: Click "🎮 Start Game" button
2. **Jump**: Press `SPACE` or `↑ UP ARROW` to jump
3. **Avoid Poop**: 💩 Don't touch poop or lose a life
4. **Collect Treats**:
   - 🦴 Bone: 3 points
   - 🥣 Kibble: 1 point
   - ❤️ Heart: +1 life
5. **Level Up**: Earn points to advance levels
6. **Game Over**: When lives reach 0

## 🏗️ Architecture Overview

### Game Loop
```
1. Input → 2. Update Dog Physics → 3. Update Entities
→ 4. Spawn New Entities → 5. Check Collisions → 6. Render
```

### State Flow
```
GameContainer (holds global state)
    ↓
GameCanvas (runs game loop)
    ├→ GameEngine.update()
    ├→ Render to canvas
    └→ Callback parent with changes
    ↓
HUD (displays state)
```

### Key Physics
- **Gravity**: 0.5 px/frame²
- **Jump Power**: -15 px/frame initial velocity
- **Max Fall Speed**: 20 px/frame
- **Speed by Level**: 5 + (level - 1) × 1.5

## 📊 Game Mechanics

### Scoring
- **Bone**: +3 points
- **Kibble**: +1 point
- **Heart Treat**: +1 life (not points)
- **Poop**: -1 life (not -points)

### Level Progression
- **Level 1-5**: 50 points per level
- **Level 5+**: 100 points per level
- **Maximum Level**: 20

### Difficulty Scaling
- **Speed Increases**: Each level increases speed
- **Spawn Rate Increases**: Obstacles spawn faster
- **Max Speed**: Capped at 15 px/frame

## 🧪 Testing

### Manual Testing Checklist
- [ ] Game starts in menu state
- [ ] "Start Game" button transitions to playing
- [ ] Dog jumps with spacebar
- [ ] Dog falls with gravity
- [ ] Obstacles spawn and move
- [ ] Collisions detect correctly
- [ ] Score updates on item collection
- [ ] Lives decrease on poop collision
- [ ] Level increases with points
- [ ] Game ends when lives = 0
- [ ] High score persists on reload
- [ ] Responsive design works
- [ ] No console errors

### TypeScript Compilation
```bash
npx tsc --noEmit    # Check without emitting
```

### ESLint
```bash
npm run lint        # Check code quality
```

## 🤖 Working with Agents

This project is designed for autonomous agents to work on specific domains:

### Game Logic Agent
Handles:
- Physics calculations
- Entity management
- Collision detection
- Game rules

**Prompt**: `.agents/prompts/game-logic-agent.md`

### Components Agent
Handles:
- React component logic
- State management
- Game loop connection
- Input handling

**Prompt**: `.agents/prompts/components-agent.md`

### UI Agent
Handles:
- Visual design
- Component styling
- User experience
- Accessibility

**Prompt**: `.agents/prompts/ui-agent.md`

## 📚 Knowledge Base for Agents

The `.agents/knowledge/` directory contains detailed documentation:

1. **PROJECT_OVERVIEW.md**: Vision, features, structure
2. **GAME_MECHANICS.md**: Detailed game rules and entity types
3. **ARCHITECTURE.md**: Implementation details and patterns

Agents should read these files before working on their domains.

## 🔒 Security Considerations

- ✅ All game logic is client-side only
- ✅ No external API calls
- ✅ No user data collection (only high score locally)
- ✅ No third-party scripts
- ✅ Input validation (key presses only)

For future iframe embedding:
- Implement Content Security Policy headers
- Sanitize any external data
- Use postMessage API for communication

## 🌐 Future Iframe Integration

When embedding in portfolio:

```html
<iframe 
  src="https://your-domain.com/mezcal-runner"
  width="1024"
  height="600"
  sandbox="allow-same-origin allow-scripts"
  style="border: none; border-radius: 8px;"
/>
```

Considerations:
- Remove external resources
- Ensure full functionality within constraints
- Handle sandbox restrictions
- Use postMessage for parent communication

## 📝 Code Style Guide

### Naming Conventions
- **Components**: PascalCase (`GameContainer.tsx`)
- **Functions**: camelCase (`updateDog()`)
- **Constants**: UPPER_SNAKE_CASE (`GRAVITY`)
- **Interfaces**: PascalCase (`GameEntity`)
- **Files**: kebab-case for utilities (`game-engine.ts`)

### Best Practices
- Use TypeScript strictly
- Comment only non-obvious logic
- Keep functions focused (<50 lines)
- Export types for reusability
- Clean up event listeners
- Use requestAnimationFrame for game loop

## 🐛 Common Issues & Solutions

### "NPM command not found"
Solution: Ensure Node.js is in your PATH or use `npx` prefix

### "Canvas rendering blank"
Solution: Check if `canvasRef.current` exists and context is 2D

### "High score not persisting"
Solution: Verify localStorage is not disabled and check localStorage key

### "Game loop running slowly"
Solution: Reduce entity count or optimize collision detection

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| PROJECT_OVERVIEW.md | High-level vision and structure |
| GAME_MECHANICS.md | Detailed game rules and mechanics |
| ARCHITECTURE.md | Technical implementation details |
| game-logic-agent.md | Agent prompt for physics/logic |
| components-agent.md | Agent prompt for React integration |
| ui-agent.md | Agent prompt for UI/UX design |

## 🎨 Customization

### Changing Game Constants
Edit `lib/game/constants.ts`:
```typescript
export const GRAVITY = 0.5;              // Physics
export const STARTING_LIVES = 3;         // Game rules
export const ENTITY_VALUES = { ... };    // Scoring
```

### Changing Colors
Edit ENTITY_COLORS in `constants.ts` or component `colors` in `GameCanvas.tsx`

### Changing UI Theme
Modify Tailwind classes in component files

## 📞 Support & Contributions

For improvements or bug fixes:
1. Create a new agent task in `.agents/prompts/`
2. Update relevant knowledge files
3. Test thoroughly
4. Update documentation

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

This project is part of a portfolio website. Created with ❤️.

---

**Happy coding and enjoy the game!** 🐕🎮
