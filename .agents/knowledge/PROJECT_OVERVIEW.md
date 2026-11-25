# Mezcal Runner Game - Project Overview

## Project Vision
A fun, simple, and intuitive runner game featuring a dog character (Mezcal) that runs automatically through obstacles and collects treats. The game is designed to be embedded in an iframe on a portfolio website.

## Core Game Mechanics

### Character Movement
- **Dog Character (Mezcal)**: Runs automatically at an increasing speed
- **Jumping**: Automatic forward movement, player can make the dog jump to avoid obstacles or collect items
- **Speed**: Increases as the player levels up

### Lives System
- **Starting Lives**: 3 hearts
- **Loss Condition**: Eating poop reduces lives by 1
- **Game Over**: When lives reach 0
- **Max Lives**: 10 (from heart treats)

### Obstacles
- **Poop**: Randomly spawned on the ground. Collision = -1 life

### Collectibles (Treats)
1. **Bone** (Gold/Yellow): +3 points
2. **Kibble** (Brown): +1 point
3. **Heart Treat** (Red/Pink, Rare): +1 life (max 10 total)

### Level System
- **Progression**: Leveling conditions to be determined
- **Impact**: Increases dog speed and difficulty
- **Future Enhancement**: May introduce faster obstacle spawn rates

### Game Over State
- Display final score
- Options:
  - "Play Again" - Restart the game
  - "Leaderboard" - View high scores (placeholder for now)

## Technical Stack
- **Framework**: Next.js 16+ with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Game Logic**: Custom canvas-based implementation
- **State Management**: React hooks (useState, useEffect, useContext)

## Project Structure
```
mezcal-runner-game/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Game/
│   │   ├── GameCanvas.tsx
│   │   ├── GameContainer.tsx
│   │   └── HUD.tsx
│   ├── UI/
│   │   ├── GameOver.tsx
│   │   ├── MainMenu.tsx
│   │   └── Button.tsx
│   └── Shared/
│       └── Heart.tsx
├── lib/
│   ├── game/
│   │   ├── GameEngine.ts
│   │   ├── entities.ts
│   │   └── constants.ts
│   └── types.ts
├── .agents/
│   ├── knowledge/
│   │   ├── PROJECT_OVERVIEW.md
│   │   ├── GAME_MECHANICS.md
│   │   ├── API_REFERENCE.md
│   │   └── ARCHITECTURE.md
│   └── prompts/
│       ├── game-logic-agent.md
│       ├── components-agent.md
│       └── ui-agent.md
└── public/
```

## Design Principles
1. **Simple**: Box-based visual representation initially
2. **Fun**: Engaging gameplay with fast-paced action
3. **Intuitive**: Easy controls - jump to avoid/collect
4. **Secure**: No external API calls, client-side only initially
5. **Future-Proof**: Easily extensible for sprite replacement and new features

## Color Scheme (Placeholder Boxes)
- **Dog**: Blue square
- **Poop**: Brown square
- **Bone Treat**: Gold/Yellow square
- **Kibble Treat**: Gray/Brown square
- **Heart Treat**: Red/Pink square
- **Background**: Light gray/white

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Canvas API support required
- Touch and keyboard input support

## Performance Considerations
- Efficient entity spawning/despawning
- Optimized collision detection
- Smooth 60 FPS game loop
- Minimal DOM updates (canvas-based rendering)

## Accessibility
- Keyboard controls (arrow keys, spacebar)
- Score/life display in HUD
- Clear visual feedback for interactions

## Future Enhancements
1. Sprite graphics replacement
2. Sound effects and background music
3. Proper leaderboard system
4. Multiple levels/maps
5. Power-ups
6. Difficulty settings
7. Mobile touch controls
8. Analytics/tracking
