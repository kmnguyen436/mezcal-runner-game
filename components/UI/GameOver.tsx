import { useEffect, useRef } from 'react';
import Button from './Button';
import { GameOverProps } from '@/lib/types';

export default function GameOver({ score, level, highScore, onPlayAgain, onBackToMenu }: GameOverProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <section className="game-card end-card">
      <div className="end-flower" aria-hidden="true">✿</div>
      <p className="game-eyebrow">THAT WAS A LOVELY RUN</p>
      <h1 ref={headingRef} tabIndex={-1}><span className="sr-only">Game over. </span>Good job, <em>Mezcal.</em></h1>
      <p className="game-intro">Every adventure deserves a treat.</p>
      <div className="end-stats">
        <div><span>FINAL SCORE</span><strong>{score}</strong></div>
        <div><span>LEVEL</span><strong>{level}</strong></div>
        <div><span>BEST SCORE</span><strong>{highScore}</strong></div>
      </div>
      <div className="end-actions"><Button onClick={onPlayAgain}>Play again <span aria-hidden="true">↗</span></Button><Button onClick={onBackToMenu} variant="secondary">Back to menu</Button></div>
    </section>
  );
}
