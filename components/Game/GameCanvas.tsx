'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from '@/lib/game/GameEngine';
import { GameCanvasProps } from '@/lib/types';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BACKGROUND_COLOR,
  GROUND_COLOR,
  GROUND_Y,
  DOG_COLOR,
  ENTITY_COLORS,
} from '@/lib/game/constants';
import Poop from '../Shared/Poop';
import Bone from '../Shared/Bone';
import Heart from '../Shared/Heart';
import Kibble from '../Shared/Kibble';

interface ExtendedGameCanvasProps extends GameCanvasProps {
  isPaused: boolean;
  onTogglePause: () => void;
}

interface RenderedEntity {
  id: string;
  type: 'poop' | 'bone' | 'kibble' | 'heart' | 'dog';
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function GameCanvas(props: ExtendedGameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef(new GameEngine());
  const keyStateRef = useRef({ jumpPressed: false });
  const [entities, setEntities] = useState<RenderedEntity[]>([]);
  const [dog, setDog] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Initialize and cleanup
  useEffect(() => {
    if (props.gameStatus !== 'playing') {
      engineRef.current.reset();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        keyStateRef.current.jumpPressed = true;
      }
      if (e.code === 'Escape') {
        e.preventDefault();
        props.onTogglePause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        keyStateRef.current.jumpPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    let animationId: number;
    const gameLoop = () => {
      // Skip update if paused
      if (!props.isPaused) {
        // Update game
        const result = engineRef.current.update({
          jumpPressed: keyStateRef.current.jumpPressed,
        });

        // Update React state
        props.onScoreChange(engineRef.current.getScore());
        props.onLivesChange(engineRef.current.getLives());
        props.onLevelChange(engineRef.current.getLevel());

        if (result.isDead) {
          props.onGameOver();
          return;
        }
      }

      // Always render
      render(ctx, engineRef.current, props.isPaused);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [props]);

  const render = (
    ctx: CanvasRenderingContext2D,
    engine: GameEngine,
    isPaused: boolean
  ) => {
    // Clear canvas with darker background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw ground line (darker)
    ctx.fillStyle = '#6b4423';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

    // Draw subtle vertical centerline as visual anchor
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Update entities for overlay
    const gameEntities = engine.getEntities();
    const renderedEntities: RenderedEntity[] = gameEntities.map((entity, idx) => ({
      id: `entity-${idx}`,
      type: entity.type as 'poop' | 'bone' | 'kibble' | 'heart',
      x: entity.x,
      y: entity.y,
      width: entity.width,
      height: entity.height,
    }));
    setEntities(renderedEntities);

    // Update dog position
    const dogData = engine.getDog();
    setDog({
      x: dogData.x,
      y: dogData.y,
      width: dogData.width,
      height: dogData.height,
    });

    // Draw pause overlay if paused
    if (isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

      ctx.font = '24px Arial';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Press ESC to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }
  };

  const getEntityComponent = (type: string) => {
    switch (type) {
      case 'poop':
      case 'flying_poop':
        return <Poop />;
      case 'bone':
      case 'flying_bone':
        return <Bone />;
      case 'kibble':
      case 'flying_kibble':
        return <Kibble />;
      case 'heart':
      case 'flying_heart':
        return <Heart />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-800">
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-blue-500 rounded-t-lg shadow-lg block"
        />
        {/* Overlay for entities */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
          }}
        >
          {/* Render game entities */}
          {entities.map((entity) => {
            // Calculate opacity based on distance from screen (fade as it approaches)
            const distanceFromRight = CANVAS_WIDTH - entity.x;
            const fadeStart = 300;
            const opacity = Math.min(1, Math.max(0.6, distanceFromRight / fadeStart));

            // Add motion blur for smooth motion effect
            const isFlying = entity.type.startsWith('flying_');
            const motionBlurAmount = isFlying ? 3 : 2;

            return (
              <div
                key={entity.id}
                className="absolute flex items-center justify-center transition-opacity"
                style={{
                  left: `${entity.x}px`,
                  top: `${entity.y}px`,
                  width: `${entity.width}px`,
                  height: `${entity.height}px`,
                  fontSize: '56px',
                  opacity: opacity,
                  filter: `drop-shadow(0 0 ${motionBlurAmount}px rgba(255, 255, 255, 0.3))`,
                }}
              >
                {getEntityComponent(entity.type)}
              </div>
            );
          })}

          {/* Render dog */}
          <div
            className="absolute flex items-center justify-center font-bold"
            style={{
              left: `${dog.x}px`,
              top: `${dog.y}px`,
              width: `${dog.width}px`,
              height: `${dog.height}px`,
              fontSize: '72px',
            }}
          >
            🐕
          </div>
        </div>
      </div>
      <div className="text-sm text-slate-400 mt-2 text-center">
        Press <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-200">SPACE</kbd> to jump
        {' | '}
        <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-200">ESC</kbd> to pause
      </div>
    </div>
  );
}
