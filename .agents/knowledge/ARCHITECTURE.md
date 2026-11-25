# Architecture & Technical Reference

## Component Hierarchy

```
<GameContainer>
  ├── <MainMenu /> (conditional)
  ├── <GameCanvas /> (conditional)
  ├── <HUD /> (always)
  └── <GameOver /> (conditional)
```

## State Management

### GameContainer State
```typescript
interface GameState {
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver';
  score: number;
  lives: number;
  level: number;
  highScore: number;
}
```

### GameCanvas State (Internal)
```typescript
interface CanvasState {
  dog: Dog;
  entities: Entity[];
  camera: { x: number };
  inputState: { jumpPressed: boolean };
}
```

## Communication Flow

1. **GameContainer** holds primary game state (score, lives, level, status)
2. **GameCanvas** receives these as props and updates on each frame
3. **HUD** reads from parent state and displays
4. **GameOver** shows final stats and handles restart
5. Event handlers in GameContainer manage transitions

## Game Loop (In GameCanvas)

```
requestAnimationFrame loop:
1. Update time delta
2. Handle input (jump)
3. Update dog physics (jump, gravity)
4. Update all entities (position, collision)
5. Spawn new entities (based on spawn timer)
6. Check collisions (dog vs all entities)
7. Update score/lives based on collisions
8. Render everything
9. Check for game over condition
10. Report state changes to parent via callback
```

## Data Persistence

### LocalStorage Keys
- `mezcal_highScore`: Number - player's best score
- `mezcal_gameSettings`: JSON - player preferences (future)

### Session State
- Maintained in React component state
- Reset on new game start

## TypeScript Interfaces

### Entity Interface
```typescript
interface Entity {
  id: string;
  type: 'poop' | 'bone' | 'kibble' | 'heart';
  x: number;
  y: number;
  width: number;
  height: number;
  velocity?: { x: number; y: number };
  value?: number;
}
```

### Dog Interface
```typescript
interface Dog {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
  isAlive: boolean;
}
```

## Constants & Configuration

All game constants are stored in `lib/game/constants.ts`:
- Canvas dimensions
- Gravity
- Entity sizes and colors
- Physics parameters
- Spawn rates

## Performance Optimizations

1. **Canvas Rendering**: Single canvas for all game visuals
2. **Entity Pooling**: Reuse entity objects instead of creating new
3. **Collision Detection**: Spatial partitioning (future optimization)
4. **RAF Throttling**: Use requestAnimationFrame for smooth 60 FPS
5. **Lazy Loading**: HUD only updates on change, not every frame

## Browser APIs Used

- **Canvas 2D Context**: Drawing graphics
- **requestAnimationFrame**: Game loop timing
- **KeyboardEvent**: Input handling
- **LocalStorage**: High score persistence
- **Math.random**: Entity spawning

## Security Considerations

- All game logic client-side (no external calls)
- No user data collection (scores are local only)
- Input validation (simple key presses)
- Future: Sanitize high scores before display
- No third-party scripts loaded

## Cross-Browser Compatibility

- Canvas support (ES5+)
- CSS3 Flexbox for layout
- Standard DOM event handlers
- Tailwind CSS for styling

## Testing Strategy

- Unit tests for game logic (utils, constants)
- Integration tests for GameCanvas
- Component tests for UI elements
- Manual testing for game feel/physics
- Keyboard/Input testing on multiple browsers

## Future Integration (iframe)

```html
<iframe 
  src="https://portfolio.com/mezcal-runner"
  width="1024"
  height="600"
  sandbox="allow-same-origin allow-scripts"
/>
```

Considerations:
- Remove external resources
- Ensure full functionality within constraints
- Handle postMessage for future communication
- Responsive sizing for iframe container
