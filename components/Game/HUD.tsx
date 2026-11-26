import { HUDProps } from '@/lib/types';

export default function HUD({ score, lives, level, highScore }: HUDProps) {
  return (
    <div className="game-hud">
      <div><span>Score</span><strong>{score}</strong></div>
      <div><span>Level</span><strong>{level}</strong></div>
      <div><span>Lives</span><strong>{lives} <span aria-hidden="true">♥</span></strong></div>
      <div><span>Best</span><strong>{highScore}</strong></div>
      <span className="sr-only" role="status" aria-atomic="true">Level {level}. {lives} {lives === 1 ? 'life' : 'lives'} remaining.</span>
    </div>
  );
}
