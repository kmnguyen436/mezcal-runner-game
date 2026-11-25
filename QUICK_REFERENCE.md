# 🐕 Mezcal Runner Game - Quick Reference

## 🎮 Game Overview

A fun runner game where your dog (Mezcal) automatically runs and you control jumping to avoid obstacles and collect treats.

| Aspect | Details |
|--------|---------|
| **Language** | TypeScript + React |
| **Framework** | Next.js 16+ |
| **Styling** | Tailwind CSS 4+ |
| **Rendering** | HTML5 Canvas |
| **Game Loop** | requestAnimationFrame (60 FPS) |
| **State** | React hooks + localStorage |

## ⚡ Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit        # Check TypeScript
```

## 🎮 Gameplay

| Input | Action |
|-------|--------|
| `SPACE` or `↑` | Jump |
| Mouse Click | Menu/Button |

| Item | Effect |
|------|--------|
| 🦴 Bone | +3 points |
| 🥣 Kibble | +1 point |
| ❤️ Heart | +1 life |
| 💩 Poop | -1 life |

## 📊 Game Constants

Located in `lib/game/constants.ts`:

```typescript
// Physics
GRAVITY = 0.5
JUMP_POWER = -15
MAX_FALL_SPEED = 20

// Game Rules
STARTING_LIVES = 3
MAX_LIVES = 10
BASE_SPEED = 5
SPEED_INCREMENT = 1.5

// Canvas
CANVAS_WIDTH = 1024
CANVAS_HEIGHT = 600
GROUND_Y = 450
```

## 🏗️ Component Map

```
app/page.tsx (Entry)
    └── GameContainer (State)
        ├── MainMenu (when menu)
        ├── GameCanvas (when playing)
        │   └── GameEngine.update()
        ├── HUD (always visible)
        └── GameOver (when game over)
```

## 📂 File Locations

| Component | File |
|-----------|------|
| Game State | `components/Game/GameContainer.tsx` |
| Rendering | `components/Game/GameCanvas.tsx` |
| Score/Lives | `components/Game/HUD.tsx` |
| Start Screen | `components/UI/MainMenu.tsx` |
| End Screen | `components/UI/GameOver.tsx` |
| Game Logic | `lib/game/GameEngine.ts` |
| Config | `lib/game/constants.ts` |
| Types | `lib/types.ts` |

## 🔑 Key Interfaces

```typescript
// From lib/types.ts

interface GameEntity {
  id: string;
  type: 'poop' | 'bone' | 'kibble' | 'heart';
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Dog {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
  isAlive: boolean;
}

interface GameState {
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver';
  score: number;
  lives: number;
  level: number;
  highScore: number;
}
```

## 🎯 Game Loop Sequence

1. **Input** → Read keyboard/mouse
2. **Update** → GameEngine.update()
3. **Physics** → Apply gravity, check landing
4. **Entities** → Move, spawn, despawn
5. **Collisions** → Check dog vs all entities
6. **Scoring** → Update score/lives/level
7. **Render** → Draw to canvas
8. **State** → Update React state
9. **Check End** → Is game over?

## 🎨 Color Scheme

```css
/* Game Elements */
Dog:        #3B82F6 (Blue)
Poop:       #92400E (Brown)
Bone:       #FBBF24 (Gold)
Kibble:     #78350F (Dark Brown)
Heart:      #EF4444 (Red)
Ground:     #92400E (Brown)
Background: #F3F4F6 (Light Gray)

/* UI */
Primary:    #4F46E5 (Indigo)
Success:    #16A34A (Green)
Warning:    #EAB308 (Yellow)
Error:      #DC2626 (Red)
```

## 📈 Progression Formula

```typescript
// Level Up
Score needed = level < 5 ? 50 : 100

// Speed
Speed = 5 + (level - 1) * 1.5

// Spawn Rate
Delay = max(50 - (level - 1) * 3, 15) frames

// Collision Box
AABB: a.x < b.x + b.w && a.x + a.w > b.x &&
      a.y < b.y + b.h && a.y + a.h > b.y
```

## 🤖 Agent Specializations

| Agent | Focus | Prompt |
|-------|-------|--------|
| **Logic** | Physics, entities, collision | `.agents/prompts/game-logic-agent.md` |
| **Components** | React, state, game loop | `.agents/prompts/components-agent.md` |
| **UI** | Visual design, UX, styling | `.agents/prompts/ui-agent.md` |

## 📚 Knowledge Base

| Doc | Contents |
|-----|----------|
| `PROJECT_OVERVIEW.md` | Vision, features, structure |
| `GAME_MECHANICS.md` | Rules, entities, physics |
| `ARCHITECTURE.md` | Technical patterns, guidelines |

## 🔧 Configuration Quick Edit

To change game feel:

```typescript
// Faster/slower falling
GRAVITY = 0.6  // Higher = faster

// Higher/lower jump
JUMP_POWER = -20  // More negative = higher

// Speed progression
SPEED_INCREMENT = 2  // Increase for steeper difficulty

// Life management
STARTING_LIVES = 5  // Start with more
MAX_LIVES = 15      // Allow more max

// Scoring
ENTITY_VALUES.bone = 5  // Bone worth more
```

## 🐛 Common Fixes

| Issue | Solution |
|-------|----------|
| Slow frame rate | Check entity count, optimize collision |
| Jump feels floaty | Increase GRAVITY or decrease JUMP_POWER |
| Too hard early | Increase STARTING_LIVES or decrease spawn rate |
| Enemies too slow | Increase BASE_SPEED or SPEED_INCREMENT |
| High score not saving | Check localStorage not disabled |

## 📱 Responsive Breakpoints

```
Mobile:    < 640px (canvas may scale)
Tablet:    640px - 1024px (adaptive)
Desktop:   > 1024px (full canvas)
```

## ♿ Accessibility

- ✅ Keyboard controls (SPACE/Arrow)
- ✅ High contrast colors
- ✅ Readable fonts
- ✅ Clear visual feedback
- ✅ No seizure-triggering flashes

## 🔐 Security Notes

- ✅ Client-side only (no backend needed)
- ✅ No external API calls
- ✅ No user data collection (except high score)
- ✅ No third-party scripts
- ✅ localStorage not required (graceful fallback)

## 📦 Dependencies

```json
{
  "react": "19.3.0",
  "react-dom": "19.3.0",
  "next": "16.4.6",
  "tailwindcss": "4.3.3",
  "typescript": "^5"
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD npm start
```

### Traditional Server
```bash
npm run build
npm start
# Server runs on :3000
```

## 📸 Screenshots Reference

- **Menu**: Shows title, instructions, high score
- **Playing**: Canvas with dog, entities, HUD with score/lives/level
- **Game Over**: Final score, level reached, high score, play again button

## 🎓 Learning Path

1. Read `PROJECT_OVERVIEW.md` - Understand vision
2. Read `GAME_MECHANICS.md` - Learn rules
3. Run `npm run dev` - See it in action
4. Read relevant component - Understand implementation
5. Modify `constants.ts` - Tune gameplay
6. Play the game - Test your changes

## 📞 Support

For issues:
1. Check error message in browser console
2. Review relevant component in `components/`
3. Check `constants.ts` for configuration
4. Read agent prompt for domain-specific help

---

**Last Updated**: November 25, 2026  
**Status**: Production Ready ✅
