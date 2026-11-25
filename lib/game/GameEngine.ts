// Core Game Engine
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  DOG_SIZE,
  DOG_START_X,
  DOG_START_Y,
  GRAVITY,
  JUMP_POWER,
  MAX_FALL_SPEED,
  SPAWN_CONFIG,
  ENTITY_SIZES,
  ENTITY_COLORS,
  ENTITY_VALUES,
  STARTING_LIVES,
  MAX_LIVES,
  DIFFICULTY_CONFIG,
  ENTITY_TYPES,
} from './constants';
import { GameEntity, Dog, CollisionResult } from '../types';

export class GameEngine {
  private dog: Dog;
  private entities: GameEntity[] = [];
  private nextEntityId = 0;
  private frameCount = 0;
  private spawnCounter = 0;
  private score = 0;
  private lives = STARTING_LIVES;
  private level = 1;
  private distanceTraveled = 0;
  private pointsForLevelUp = 10;

  constructor() {
    this.dog = {
      x: DOG_START_X,
      y: DOG_START_Y,
      width: DOG_SIZE,
      height: DOG_SIZE,
      velocityY: 0,
      isJumping: false,
      isAlive: true,
    };
  }

  // Main update loop - call once per frame
  update(input: { jumpPressed: boolean }): GameUpdateResult {
    this.frameCount++;
    this.spawnCounter++;

    // Update dog
    this.updateDog(input);

    // Update entities
    this.updateEntities();

    // Spawn new entities
    this.spawnEntities();

    // Check collisions
    const collisions = this.checkCollisions();

    // Process collisions
    let scoreGain = 0;
    let lifeGain = 0;
    for (const collision of collisions) {
      if (collision.type === 'poop') {
        this.lives = Math.max(0, this.lives - 1);
      } else if (collision.type === 'bone') {
        scoreGain += 3;
      } else if (collision.type === 'kibble') {
        scoreGain += 1;
      } else if (collision.type === 'heart') {
        lifeGain += 1;
      }
      // Remove entity after collision
      this.entities = this.entities.filter((e) => e.id !== collision.entity?.id);
    }

    // Update score and lives
    this.score += scoreGain;
    this.lives = Math.min(MAX_LIVES, this.lives + lifeGain);

    // Track distance for scoring
    const speed = DIFFICULTY_CONFIG.speedByLevel(this.level);
    this.distanceTraveled += speed;

    // Check level up
    if (this.score >= this.pointsForLevelUp && this.level < 20) {
      this.level++;
      this.pointsForLevelUp += 10;
    }

    return {
      frameCount: this.frameCount,
      scoreGain,
      lifeGain,
      isDead: this.lives <= 0,
      collisions,
    };
  }

  private updateDog(input: { jumpPressed: boolean }) {
    // Apply gravity
    this.dog.velocityY += GRAVITY;
    this.dog.velocityY = Math.min(this.dog.velocityY, MAX_FALL_SPEED);

    // Update position
    this.dog.y += this.dog.velocityY;

    // Ground collision
    if (this.dog.y >= GROUND_Y - this.dog.height) {
      this.dog.y = GROUND_Y - this.dog.height;
      this.dog.velocityY = 0;
      this.dog.isJumping = false;

      // Handle jump input
      if (input.jumpPressed) {
        this.dog.velocityY = JUMP_POWER;
        this.dog.isJumping = true;
      }
    }
  }

  private updateEntities() {
    const speed = DIFFICULTY_CONFIG.speedByLevel(this.level);

    for (const entity of this.entities) {
      entity.x -= speed;
      entity.velocityX = -speed;
    }

    // Remove off-screen entities
    this.entities = this.entities.filter((e) => e.x > SPAWN_CONFIG.despawnX);
  }

  private spawnEntities() {
    const spawnDelay = Math.round(
      DIFFICULTY_CONFIG.spawnRateByLevel(this.level)
    );

    if (this.spawnCounter > spawnDelay && this.entities.length < SPAWN_CONFIG.maxEntities) {
      this.spawnCounter = 0;

      const rand = Math.random();
      let type: EntityType;

      // Level 5+: Flying poop
      // Level 6+: Flying kibble, bone, heart
      if (this.level >= 6) {
        const flyingChance = 0.15 + (this.level - 6) * 0.03;
        const groundPoopChance = SPAWN_CONFIG.spawnChance.poop * 0.7; // Reduce ground poop
        const groundKibbleChance = SPAWN_CONFIG.spawnChance.kibble * 0.7;
        const groundBoneChance = SPAWN_CONFIG.spawnChance.bone * 0.7;

        if (rand < flyingChance) {
          // Randomly pick which flying entity
          const flyingRand = Math.random();
          if (flyingRand < 0.5) {
            type = ENTITY_TYPES.FLYING_POOP;
          } else if (flyingRand < 0.75) {
            type = ENTITY_TYPES.FLYING_KIBBLE;
          } else if (flyingRand < 0.9) {
            type = ENTITY_TYPES.FLYING_BONE;
          } else {
            type = ENTITY_TYPES.FLYING_HEART;
          }
        } else if (rand < flyingChance + groundPoopChance) {
          type = ENTITY_TYPES.POOP;
        } else if (rand < flyingChance + groundPoopChance + groundKibbleChance) {
          type = ENTITY_TYPES.KIBBLE;
        } else if (rand < flyingChance + groundPoopChance + groundKibbleChance + groundBoneChance) {
          type = ENTITY_TYPES.BONE;
        } else {
          type = ENTITY_TYPES.HEART;
        }
      } else if (this.level >= 5) {
        // Level 5: Only flying poop
        const flyingChance = 0.1 + (this.level - 5) * 0.02;
        if (rand < flyingChance) {
          type = ENTITY_TYPES.FLYING_POOP;
        } else if (rand < flyingChance + SPAWN_CONFIG.spawnChance.poop) {
          type = ENTITY_TYPES.POOP;
        } else if (rand < flyingChance + SPAWN_CONFIG.spawnChance.poop + SPAWN_CONFIG.spawnChance.kibble) {
          type = ENTITY_TYPES.KIBBLE;
        } else if (rand < flyingChance + SPAWN_CONFIG.spawnChance.poop + SPAWN_CONFIG.spawnChance.kibble + SPAWN_CONFIG.spawnChance.bone) {
          type = ENTITY_TYPES.BONE;
        } else {
          type = ENTITY_TYPES.HEART;
        }
      } else {
        // Levels 1-4: Ground entities only
        if (rand < SPAWN_CONFIG.spawnChance.poop) {
          type = ENTITY_TYPES.POOP;
        } else if (rand < SPAWN_CONFIG.spawnChance.poop + SPAWN_CONFIG.spawnChance.kibble) {
          type = ENTITY_TYPES.KIBBLE;
        } else if (rand < SPAWN_CONFIG.spawnChance.poop + SPAWN_CONFIG.spawnChance.kibble + SPAWN_CONFIG.spawnChance.bone) {
          type = ENTITY_TYPES.BONE;
        } else {
          type = ENTITY_TYPES.HEART;
        }
      }

      const size = ENTITY_SIZES[type];
      let y;

      // Flying entities spawn at random height, ground entities at ground level
      const isFlying = type.startsWith('flying_');
      if (isFlying) {
        y =
          Math.random() *
            (SPAWN_CONFIG.spawnAreaMax - SPAWN_CONFIG.spawnAreaMin) +
          SPAWN_CONFIG.spawnAreaMin;
      } else {
        y = GROUND_Y - size.height;
      }

      this.entities.push({
        id: `entity_${this.nextEntityId++}`,
        type,
        x: SPAWN_CONFIG.spawnX,
        y,
        width: size.width,
        height: size.height,
      });
    }
  }

  private checkCollisions(): CollisionResult[] {
    const results: CollisionResult[] = [];

    for (const entity of this.entities) {
      if (this.checkAABB(this.dog, entity)) {
        results.push({
          collided: true,
          entity,
          type: entity.type,
        });
      }
    }

    return results;
  }

  private checkAABB(a: Dog | GameEntity, b: GameEntity): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // Getters
  getDog(): Dog {
    return { ...this.dog };
  }

  getEntities(): GameEntity[] {
    return this.entities.map((e) => ({ ...e }));
  }

  getScore(): number {
    return this.score;
  }

  getLives(): number {
    return this.lives;
  }

  getLevel(): number {
    return this.level;
  }

  isGameOver(): boolean {
    return this.lives <= 0;
  }

  // Reset
  reset() {
    this.dog = {
      x: DOG_START_X,
      y: DOG_START_Y,
      width: DOG_SIZE,
      height: DOG_SIZE,
      velocityY: 0,
      isJumping: false,
      isAlive: true,
    };
    this.entities = [];
    this.nextEntityId = 0;
    this.frameCount = 0;
    this.spawnCounter = 0;
    this.score = 0;
    this.lives = STARTING_LIVES;
    this.level = 1;
    this.distanceTraveled = 0;
    this.pointsForLevelUp = 50;
  }
}

export interface GameUpdateResult {
  frameCount: number;
  scoreGain: number;
  lifeGain: number;
  isDead: boolean;
  collisions: CollisionResult[];
}
