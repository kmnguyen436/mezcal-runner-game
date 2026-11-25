// Game Constants - Configuration for all game mechanics
export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 600;
export const GROUND_Y = 450;
export const BACKGROUND_COLOR = '#F3F4F6';
export const GROUND_COLOR = '#92400E';

// Dog Configuration
export const DOG_SIZE = 30;
export const DOG_START_X = 100;
export const DOG_START_Y = GROUND_Y - DOG_SIZE;
export const DOG_COLOR = '#3B82F6';

// Physics
export const GRAVITY = 0.5;
export const JUMP_POWER = -15;
export const MAX_FALL_SPEED = 20;

// Entity Sizes
export const ENTITY_SIZES = {
  poop: { width: 35, height: 35 },
  bone: { width: 35, height: 30 },
  kibble: { width: 30, height: 30 },
  heart: { width: 35, height: 35 },
  flying_poop: { width: 35, height: 35 },
  flying_bone: { width: 35, height: 30 },
  flying_kibble: { width: 30, height: 30 },
  flying_heart: { width: 35, height: 35 },
} as const;

// Entity Colors
export const ENTITY_COLORS = {
  poop: '#92400E',
  bone: '#FBBF24',
  kibble: '#78350F',
  heart: '#EF4444',
  flying_poop: '#92400E',
  flying_bone: '#FBBF24',
  flying_kibble: '#78350F',
  flying_heart: '#EF4444',
} as const;

// Entity Values
export const ENTITY_VALUES = {
  poop: -1, // Lose 1 life
  bone: 3,
  kibble: 1,
  heart: 0, // Special: adds life
} as const;

// Spawn Configuration
export const SPAWN_CONFIG = {
  baseDelay: 100,
  delayVariance: 25,
  spawnX: CANVAS_WIDTH + 50,
  despawnX: -100,
  maxEntities: 12,
  spawnChance: { poop: 0.60, kibble: 0.30, bone: 0.08, heart: 0.02 },
  spawnAreaMin: 100,
  spawnAreaMax: 400,
} as const;

// Game Rules
export const STARTING_LIVES = 3;
export const MAX_LIVES = 10;
export const STARTING_LEVEL = 1;
export const BASE_SPEED = 3;
export const SPEED_INCREMENT = 0.4;
export const MAX_SPEED = 7;

// Difficulty Scaling
export const DIFFICULTY_CONFIG = {
  spawnRateByLevel: (level: number) => {
    const baseDe = SPAWN_CONFIG.baseDelay - (level - 1) * 2;
    return Math.max(baseDe, 60); // Min 60 frame delay (spawn cap)
  },
  speedByLevel: (level: number) => {
    const speed = BASE_SPEED + (level - 1) * SPEED_INCREMENT;
    return Math.min(speed, MAX_SPEED);
  },
  levelUpThreshold: (level: number) => {
    return level < 5 ? 50 : 100;
  },
} as const;

// Game States
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
} as const;

export type GameStatus = typeof GAME_STATES[keyof typeof GAME_STATES];

// Entity Types
export const ENTITY_TYPES = {
  POOP: 'poop',
  BONE: 'bone',
  KIBBLE: 'kibble',
  HEART: 'heart',
  FLYING_POOP: 'flying_poop',
  FLYING_BONE: 'flying_bone',
  FLYING_KIBBLE: 'flying_kibble',
  FLYING_HEART: 'flying_heart',
} as const;

export type EntityType = typeof ENTITY_TYPES[keyof typeof ENTITY_TYPES];
