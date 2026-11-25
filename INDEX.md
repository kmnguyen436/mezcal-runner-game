# 📖 Mezcal Runner Game - Complete Documentation Index

Welcome to your Mezcal Runner Game project! This index helps you navigate all the documentation and resources.

## 🎮 Getting Started (START HERE!)

**New to the project?** Follow this order:

1. **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - What was built, what's ready
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick lookup for common tasks
3. Run `npm run dev` and play the game!

## 📚 Documentation by Purpose

### For Players
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Game features and how to play
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Game controls and mechanics

### For Developers
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Architecture and code organization
- **[README.md](./README.md)** - Original project README
- **TypeScript** - Strict type checking across all code

### For Game Designers
- **[.agents/knowledge/GAME_MECHANICS.md](./.agents/knowledge/GAME_MECHANICS.md)** - Detailed game rules
- **[.agents/knowledge/PROJECT_OVERVIEW.md](./.agents/knowledge/PROJECT_OVERVIEW.md)** - Vision and features
- **[lib/game/constants.ts](./lib/game/constants.ts)** - All tunable parameters

### For AI Agents
- **[.agents/prompts/game-logic-agent.md](./.agents/prompts/game-logic-agent.md)** - For physics/logic work
- **[.agents/prompts/components-agent.md](./.agents/prompts/components-agent.md)** - For React integration
- **[.agents/prompts/ui-agent.md](./.agents/prompts/ui-agent.md)** - For UI/UX work
- **[.agents/knowledge/ARCHITECTURE.md](./.agents/knowledge/ARCHITECTURE.md)** - Technical implementation

## 📁 Project Structure Quick Reference

```
mezcal-runner-game/
│
├── 📄 Documentation
│   ├── SETUP_COMPLETE.md           ← START: What was built
│   ├── QUICK_REFERENCE.md          ← Quick lookup
│   ├── IMPLEMENTATION_GUIDE.md     ← For developers
│   ├── INDEX.md                    ← This file
│   └── README.md                   ← Original README
│
├── 🤖 Agent Framework
│   └── .agents/
│       ├── knowledge/              ← Shared knowledge
│       │   ├── PROJECT_OVERVIEW.md
│       │   ├── GAME_MECHANICS.md
│       │   └── ARCHITECTURE.md
│       └── prompts/                ← Agent specializations
│           ├── game-logic-agent.md
│           ├── components-agent.md
│           └── ui-agent.md
│
├── 🎮 Game Components
│   └── components/
│       ├── Game/
│       │   ├── GameContainer.tsx   ← Main orchestrator
│       │   ├── GameCanvas.tsx      ← Canvas rendering
│       │   └── HUD.tsx             ← Score/lives display
│       ├── UI/
│       │   ├── MainMenu.tsx        ← Start screen
│       │   ├── GameOver.tsx        ← End screen
│       │   └── Button.tsx          ← Reusable button
│       └── Shared/
│           └── Heart.tsx           ← Life indicator
│
├── ⚙️ Game Logic
│   └── lib/
│       ├── game/
│       │   ├── GameEngine.ts       ← Core physics & rules
│       │   └── constants.ts        ← Configuration
│       └── types.ts                ← TypeScript interfaces
│
├── 🏠 Next.js App
│   └── app/
│       ├── page.tsx                ← Entry point
│       ├── layout.tsx              ← Root layout
│       └── globals.css             ← Global styles
│
└── 📦 Configuration
    ├── package.json                ← Dependencies
    ├── tsconfig.json               ← TypeScript config
    ├── next.config.ts              ← Next.js config
    └── tailwind.config.js          ← Tailwind config
```

## 🎯 Documentation by Use Case

### "I want to play the game"
→ Run `npm run dev` and open http://localhost:3000

### "I want to understand how it works"
→ Read [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

### "I want to change game parameters"
→ Edit [lib/game/constants.ts](./lib/game/constants.ts)

### "I want to add new features"
→ Read [.agents/knowledge/ARCHITECTURE.md](./.agents/knowledge/ARCHITECTURE.md)

### "I want to understand the game rules"
→ Read [.agents/knowledge/GAME_MECHANICS.md](./.agents/knowledge/GAME_MECHANICS.md)

### "I'm an AI agent working on this"
→ Read [.agents/prompts/](./agents/prompts/) for your specialization

## 📊 Game Overview

| Aspect | Details |
|--------|---------|
| **Type** | 2D Runner Game |
| **Player** | Mezcal (dog character) |
| **Goal** | Avoid obstacles, collect treats, increase score |
| **Main Control** | SPACE or UP ARROW to jump |
| **Platform** | Web browser (desktop/tablet/mobile) |
| **Tech Stack** | React 19 + Next.js 16 + TypeScript + Tailwind |

## 🎮 Core Gameplay

1. Dog runs automatically (speed increases with level)
2. Player jumps to avoid obstacles and collect items
3. Obstacles: 💩 Poop (-1 life)
4. Collectibles: 🦴 Bone (+3 pts), 🥣 Kibble (+1 pt), ❤️ Heart (+1 life)
5. Game ends when lives reach 0
6. High score is saved

## 🔄 Development Workflow

```
1. Read documentation relevant to your task
2. Find the appropriate component/file
3. Make changes
4. Test with npm run dev
5. Verify no TypeScript errors (npx tsc --noEmit)
6. Commit changes
```

## 🤖 Agent Workflow

```
1. Read your specialization prompt in .agents/prompts/
2. Reference knowledge base in .agents/knowledge/
3. Work on your domain (logic/components/ui)
4. Test your changes
5. Update documentation if needed
```

## 📝 Key Files by Role

### Game Designer
- [.agents/knowledge/GAME_MECHANICS.md](./.agents/knowledge/GAME_MECHANICS.md)
- [lib/game/constants.ts](./lib/game/constants.ts)

### Frontend Developer
- [components/Game/GameCanvas.tsx](./components/Game/GameCanvas.tsx)
- [components/Game/GameContainer.tsx](./components/Game/GameContainer.tsx)
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

### Game Programmer
- [lib/game/GameEngine.ts](./lib/game/GameEngine.ts)
- [.agents/prompts/game-logic-agent.md](./.agents/prompts/game-logic-agent.md)

### UI/UX Designer
- [components/UI/MainMenu.tsx](./components/UI/MainMenu.tsx)
- [components/UI/GameOver.tsx](./components/UI/GameOver.tsx)
- [.agents/prompts/ui-agent.md](./.agents/prompts/ui-agent.md)

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Check code quality
npx tsc --noEmit        # Check TypeScript compilation
```

## 📱 Responsive Design

The game works on all screen sizes:
- Desktop: Full 1024x600 canvas
- Tablet: Responsive scaling
- Mobile: Touch-friendly (ready for implementation)

## 🔒 Security & Privacy

- ✅ Client-side only (no server needed)
- ✅ No external API calls
- ✅ No user data collection
- ✅ No third-party scripts
- ✅ High score stored locally (can be disabled)

## 🎨 Customization

All game parameters are in one place:

```typescript
// lib/game/constants.ts
export const GRAVITY = 0.5;              // Physics
export const STARTING_LIVES = 3;         // Game rules
export const BASE_SPEED = 5;             // Starting speed
export const ENTITY_VALUES = { ... };    // Scoring
// ... and many more!
```

## 🌐 Future Iframe Integration

When embedding on your portfolio:

```html
<iframe 
  src="https://your-site.com/mezcal-runner"
  width="1024"
  height="600"
  sandbox="allow-same-origin allow-scripts"
/>
```

## 🐛 Troubleshooting

| Problem | Solution | File |
|---------|----------|------|
| Game won't start | Check browser console for errors | - |
| Slow performance | Reduce entity count or optimize collision | constants.ts |
| Jump feels wrong | Adjust GRAVITY or JUMP_POWER | constants.ts |
| TypeScript errors | Run `npx tsc --noEmit` to see details | - |
| High score not saving | Verify localStorage is not disabled | GameContainer.tsx |

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## ✅ Feature Checklist

- [x] Menu screen
- [x] Game canvas with 60 FPS rendering
- [x] Dog character with physics
- [x] Obstacle spawning
- [x] Treat collection
- [x] Collision detection
- [x] Score tracking
- [x] Level progression
- [x] Lives system
- [x] Game over screen
- [x] High score persistence
- [x] Responsive UI
- [x] TypeScript strict mode
- [x] Agent framework
- [x] Documentation

## 🎯 Next Steps

1. **Play**: Run `npm run dev` and enjoy!
2. **Customize**: Edit constants.ts to tune gameplay
3. **Extend**: Use agent framework for new features
4. **Deploy**: Run `npm run build` for production
5. **Embed**: Add iframe to your portfolio

## 📞 Support

For questions about:
- **Game mechanics**: See [.agents/knowledge/GAME_MECHANICS.md](./.agents/knowledge/GAME_MECHANICS.md)
- **Architecture**: See [.agents/knowledge/ARCHITECTURE.md](./.agents/knowledge/ARCHITECTURE.md)
- **Implementation**: See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Quick lookup**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## 📄 File Sizes (Approximate)

- GameEngine.ts: 6 KB
- Components: 15 KB combined
- Constants: 2 KB
- Types: 1.5 KB
- Documentation: 30+ KB
- **Total**: 100+ KB of production-ready code

## 🎉 You're All Set!

Your Mezcal Runner Game is complete, documented, and ready to use!

**Next step**: `npm run dev` 🚀

---

**Version**: 1.0 (Initial Implementation)  
**Date**: November 25, 2026  
**Status**: Production Ready ✅
