'use client';

import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '@/lib/game/GameEngine';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GROUND_Y } from '@/lib/game/constants';
import type { Dog, GameEntity } from '@/lib/types';
import Poop from '../Shared/Poop';
import Bone from '../Shared/Bone';
import Heart from '../Shared/Heart';
import Kibble from '../Shared/Kibble';

interface GameCanvasProps {
  isPaused: boolean;
  onScoreChange: (score: number) => void;
  onLivesChange: (lives: number) => void;
  onLevelChange: (level: number) => void;
  onGameOver: (score: number) => void;
  onPause: () => void;
  onTogglePause: () => void;
}

function drawScenery(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#e8eee1';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#f6e2bb';
  ctx.beginPath();
  ctx.arc(810, 105, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d2dfc9';
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.quadraticCurveTo(180, 230, 370, GROUND_Y);
  ctx.quadraticCurveTo(580, 180, 830, GROUND_Y);
  ctx.quadraticCurveTo(940, 300, 1024, GROUND_Y);
  ctx.fill();
  ctx.fillStyle = '#b7cba9';
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.quadraticCurveTo(260, 310, 520, GROUND_Y);
  ctx.quadraticCurveTo(790, 290, 1024, GROUND_Y);
  ctx.fill();
  ctx.fillStyle = '#a4b993';
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 12);
  ctx.fillStyle = '#d9bf9f';
  ctx.fillRect(0, GROUND_Y + 12, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y - 12);
  ctx.strokeStyle = '#c9aa89';
  ctx.lineWidth = 3;
  for (let x = 20; x < CANVAS_WIDTH; x += 125) {
    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y + 65);
    ctx.lineTo(x + 35, GROUND_Y + 65);
    ctx.stroke();
  }
}

function entityArt(type: GameEntity['type']) {
  switch (type.replace('flying_', '')) {
    case 'poop': return <Poop />;
    case 'bone': return <Bone />;
    case 'kibble': return <Kibble />;
    case 'heart': return <Heart />;
    default: return null;
  }
}

export default function GameCanvas({
  isPaused, onScoreChange, onLivesChange, onLevelChange, onGameOver, onPause, onTogglePause,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const jumpPressed = useRef(false);
  const jumpRequested = useRef(false);
  const [view, setView] = useState<{ dog: Dog | null; entities: GameEntity[] }>({ dog: null, entities: [] });

  useEffect(() => {
    const engine = new GameEngine();
    engineRef.current = engine;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    drawScenery(ctx);
    setView({ dog: engine.getDog(), entities: engine.getEntities() });
    return () => { engineRef.current = null; };
  }, []);

  useEffect(() => {
    if (isPaused) {
      jumpPressed.current = false;
      jumpRequested.current = false;
      return;
    }
    playAreaRef.current?.focus();
    let frame: number;
    const loop = () => {
      const engine = engineRef.current;
      if (!engine) return;
      const result = engine.update({ jumpPressed: jumpPressed.current || jumpRequested.current });
      jumpRequested.current = false;
      setView({ dog: engine.getDog(), entities: engine.getEntities() });
      onScoreChange(engine.getScore());
      onLivesChange(engine.getLives());
      onLevelChange(engine.getLevel());
      if (result.isDead) {
        onGameOver(engine.getScore());
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isPaused, onGameOver, onLevelChange, onLivesChange, onScoreChange]);

  useEffect(() => {
    const pauseOnBlur = () => {
      jumpPressed.current = false;
      onPause();
    };
    const pauseWhenHidden = () => {
      if (document.hidden) pauseOnBlur();
    };
    window.addEventListener('blur', pauseOnBlur);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      window.removeEventListener('blur', pauseOnBlur);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, [onPause]);

  const place = (entity: Pick<GameEntity, 'x' | 'y' | 'width' | 'height'>) => ({
    left: `${entity.x / CANVAS_WIDTH * 100}%`,
    top: `${entity.y / CANVAS_HEIGHT * 100}%`,
    width: `${entity.width / CANVAS_WIDTH * 100}%`,
    height: `${entity.height / CANVAS_HEIGHT * 100}%`,
  });

  return (
    <div className="game-play">
      <div
        ref={playAreaRef}
        className="game-scene"
        tabIndex={0}
        role="region"
        aria-label="Game area"
        aria-describedby="game-controls"
        onKeyDown={(event) => {
          if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            jumpPressed.current = true;
            jumpRequested.current = true;
          } else if (event.code === 'Escape' && !event.repeat) {
            event.preventDefault();
            onTogglePause();
          }
        }}
        onKeyUp={(event) => {
          if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            jumpPressed.current = false;
          }
        }}
        onBlur={() => { jumpPressed.current = false; }}
      >
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} aria-hidden="true" />
        <div className="scene-entities" aria-hidden="true">
          {view.entities.map((entity) => (
            <div className="scene-entity" key={entity.id} style={place(entity)}>{entityArt(entity.type)}</div>
          ))}
          {view.dog && <div className="scene-entity scene-dog" style={place(view.dog)}>🐕</div>}
        </div>
        {isPaused && <div className="scene-paused" aria-hidden="true">Taking a little break ✳</div>}
      </div>
      <p id="game-controls" className="controls-hint">Focus the game area and press Space or ↑ to jump, or use the Jump button. Press Esc to pause.</p>
      {!isPaused && (
        <div className="play-controls">
          <button
            type="button"
            className="game-button game-button-primary"
            onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); jumpPressed.current = true; jumpRequested.current = true; }}
            onPointerUp={() => { jumpPressed.current = false; }}
            onPointerCancel={() => { jumpPressed.current = false; }}
            onLostPointerCapture={() => { jumpPressed.current = false; }}
            onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { jumpPressed.current = true; jumpRequested.current = true; } }}
            onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') jumpPressed.current = false; }}
            onBlur={() => { jumpPressed.current = false; }}
            onClick={(event) => { if (event.detail === 0) jumpRequested.current = true; }}
          >Jump ↑</button>
          <button type="button" className="game-button game-button-secondary" onClick={onPause}>Pause</button>
        </div>
      )}
    </div>
  );
}
