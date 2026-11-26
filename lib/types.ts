// TypeScript Types and Interfaces
import { EntityType, GameStatus } from './game/constants';

export interface GameEntity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX?: number;
  velocityY?: number;
  value?: number;
}

export interface Dog {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
  isAlive: boolean;
}

export interface GameState {
  gameStatus: GameStatus;
  score: number;
  lives: number;
  level: number;
  highScore: number;
  startTime: number;
  gameOverTime?: number;
}

export interface GameCanvasProps {
  score: number;
  lives: number;
  level: number;
  gameStatus: GameStatus;
  onScoreChange: (score: number) => void;
  onLivesChange: (lives: number) => void;
  onLevelChange: (level: number) => void;
  onGameOver: () => void;
}

export interface HUDProps {
  score: number;
  lives: number;
  level: number;
  highScore: number;
}

export interface MainMenuProps {
  onStartGame: () => void;
  highScore: number;
}

export interface GameOverProps {
  score: number;
  level: number;
  highScore: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export interface CollisionResult {
  collided: boolean;
  entity?: GameEntity;
  type?: EntityType;
}
