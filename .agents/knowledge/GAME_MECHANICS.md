# Game Mechanics Reference

## Entity Types

### Dog (Player Character)
- **Position**: Fixed X position (left-center), variable Y position (vertical)
- **Size**: 30x30 pixels
- **Color**: Blue (#3B82F6)
- **Movement**:
  - Horizontal: Stationary (world moves around it)
  - Vertical: Jumps via key press, gravity pulls down
- **States**: Running, Jumping, Dead
- **Lives**: 1-10 (starts at 3)

### Poop (Obstacle)
- **Size**: 25x25 pixels
- **Color**: Brown (#92400E)
- **Spawn**: Random Y position on right side of screen
- **Behavior**: Moves left toward dog
- **Collision**: Dog loses 1 life
- **Despawn**: When off-screen left

### Bone Treat
- **Size**: 25x20 pixels
- **Color**: Gold (#FBBF24)
- **Value**: +3 points
- **Spawn**: Random position on right side
- **Collision**: Added to score, despawned
- **Rarity**: Medium

### Kibble Treat
- **Size**: 20x20 pixels
- **Color**: Gray/Brown (#78350F)
- **Value**: +1 point
- **Spawn**: Random position on right side
- **Collision**: Added to score, despawned
- **Rarity**: Common

### Heart Treat (Rare)
- **Size**: 25x25 pixels
- **Color**: Red (#EF4444)
- **Value**: +1 life (max 10)
- **Spawn**: Random position on right side
- **Collision**: Life added (if < 10), despawned
- **Rarity**: Rare (~2-3% spawn rate)

## Game States

### Menu State
- Display title and instructions
- "Start Game" button
- Shows best score (if exists)

### Playing State
- Dog running, can jump
- Entities spawning
- Score updating
- Lives displayed

### Game Over State
- Display final score
- "Play Again" button
- "Leaderboard" button (placeholder)
- Fade/pause effect

## Physics System

### Gravity
- Constant downward acceleration: 0.5 pixels/frame²
- Dog falls until it hits ground (Y = 450)

### Jump Mechanics
- Initial velocity: -15 pixels/frame
- Max air time: ~12 frames
- Can only jump when on ground (Y ≥ 450)

### Collision Detection
- AABB (Axis-Aligned Bounding Box)
- Check dog hitbox against all entities each frame

## Scoring System
- Bone: 3 points
- Kibble: 1 point
- Heart Treat: Increases life by 1 (not points)
- Survive 1 second: +0.1 points (encourages avoidance)

## Difficulty Progression

### Speed Scaling
```
Base Speed: 5 pixels/frame
Speed = Base Speed + (Level - 1) * 1.5
Max Speed: Capped at ~15 pixels/frame (Level 8+)
```

### Level Up Conditions
- **Initial**: Every 50 points
- **Later**: Every 100 points (after level 5)

### Difficulty Scaling with Level
- Spawn rate increases: Base 50 frames between spawns → 25 frames at level 5+
- Obstacle variety increases at later levels (future)

## Entity Spawning

### Spawn Mechanism
- Random Y position: 100-400
- Always spawn at X = screen width + 50
- Random delay between spawns (25-50 frames)
- Spawn pool: 70% obstacle, 25% kibble, 3% bone, 2% heart treat

### Despawn Mechanism
- When X < -100 (completely off-screen)
- Maximum entities on screen: 20

## Input Handling

### Keyboard
- **Spacebar or Up Arrow**: Jump
- Future: Arrow keys for mobile-like controls

### Game Control
- Pause: ESC key
- Mute (future): M key

## Rendering Order
1. Background
2. Ground line
3. Obstacles and treats
4. Dog (always on top)
5. HUD (score, lives, level)

## Performance Targets
- 60 FPS on modern devices
- <16ms per frame
- Minimal GC pressure (object pooling for entities)
