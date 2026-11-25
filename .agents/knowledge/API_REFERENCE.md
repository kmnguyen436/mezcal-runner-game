# Agent Specialization Guide

This document helps agents understand their specialized roles in the project.

## Game Logic Agent
**Focus**: Core game mechanics, physics, collision detection, entity management

**Responsibilities**:
- Create/maintain GameEngine.ts
- Implement physics (gravity, jumping, movement)
- Entity spawning and despawning logic
- Collision detection system
- Score calculation and level progression
- Game state management

**Key Files**:
- `lib/game/GameEngine.ts`
- `lib/game/constants.ts`
- `lib/types.ts`

**Guidelines**:
- Keep entity logic pure (no React dependencies)
- Use constants from constants.ts
- Maintain 60 FPS target
- Write testable functions
- Document physics formulas

## Components Agent
**Focus**: React components, state management, rendering

**Responsibilities**:
- Create GameContainer component (main orchestrator)
- Create GameCanvas component (canvas rendering)
- Create HUD component (score/lives display)
- Component composition and prop passing
- React lifecycle management
- Event handling and callbacks

**Key Files**:
- `components/Game/GameContainer.tsx`
- `components/Game/GameCanvas.tsx`
- `components/Game/HUD.tsx`
- `lib/types.ts`

**Guidelines**:
- Use TypeScript interfaces from lib/types.ts
- Keep components focused and reusable
- Use React hooks (useState, useEffect, useCallback)
- Optimize re-renders
- Handle memory cleanup (listeners, intervals)

## UI Agent
**Focus**: User interface, visual design, user interactions

**Responsibilities**:
- Create MainMenu component (start screen)
- Create GameOver component (end screen)
- Create Button component (reusable)
- Create Heart component (life display)
- Design visual feedback
- Handle transitions and animations

**Key Files**:
- `components/UI/MainMenu.tsx`
- `components/UI/GameOver.tsx`
- `components/UI/Button.tsx`
- `components/Shared/Heart.tsx`
- `app/page.tsx` (main entry point)

**Guidelines**:
- Use Tailwind CSS for styling
- Keep UI responsive
- Ensure accessibility
- Provide clear user feedback
- Match design principles (simple, fun, intuitive)

## Communication Protocol

When one agent needs to work with another's code:

1. **Between Logic and Components**:
   - GameEngine exports pure functions
   - GameCanvas calls GameEngine functions
   - Components pass callbacks to update parent state

2. **Between Components and UI**:
   - Props flow down (state from Container → Canvas/HUD/Menu)
   - Events flow up (clicks/input from UI → Container callbacks)
   - Share interfaces from lib/types.ts

3. **All Agents**:
   - Reference PROJECT_OVERVIEW.md for vision
   - Follow conventions in existing code
   - Use TypeScript strictly
   - Add comments only for non-obvious logic
   - Run linting before submitting changes

## Common Tasks by Agent

### Game Logic Agent
- "Implement jump physics"
- "Create collision detection"
- "Add entity spawning system"
- "Calculate difficulty scaling"
- "Manage game state transitions"

### Components Agent
- "Create GameContainer orchestrator"
- "Connect GameEngine to React"
- "Implement render loop in GameCanvas"
- "Build state prop drilling"
- "Handle game lifecycle (start/stop)"

### UI Agent
- "Create start screen menu"
- "Design game over modal"
- "Show score and lives during gameplay"
- "Add button interactions"
- "Create visual polish and feedback"

## Development Workflow

1. **Game Logic Agent** starts (creates core engine)
2. **Components Agent** builds container (connects logic to React)
3. **UI Agent** creates screens (menu, hud, gameover)
4. **Integration**: Components Agent ensures smooth data flow
5. **Polish**: All agents iterate on their domains

## Code Style

- TypeScript strict mode
- Descriptive variable names
- Max function length: 50 lines (refactor if longer)
- Use enums for type safety
- Avoid magic numbers (use constants)
- Document complex logic
- Include type definitions

## Testing Strategy

- **Logic Agent**: Unit tests for GameEngine functions
- **Components Agent**: Integration tests for state flow
- **UI Agent**: Component tests for rendering/interactions
- Run tests with: `npm test` (when setup)

## Knowledge Base Files
- `PROJECT_OVERVIEW.md` - Vision and structure
- `GAME_MECHANICS.md` - Detailed mechanics reference
- `ARCHITECTURE.md` - Technical implementation details
- `API_REFERENCE.md` - Function signatures and exports

Always start by reading these files to understand the full context!
