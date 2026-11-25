'use client';

import React from 'react';
import Button from './Button';
import { GameOverProps } from '@/lib/types';

export default function GameOver(props: GameOverProps) {
  const isNewHighScore = props.score > props.highScore;

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-2">Game Over!</h1>
        <p className="text-xl text-slate-300">Great job, Mezcal!</p>
      </div>

      <div className="bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-lg p-8 mb-8 border-2 border-red-600/50">
        <div className="mb-6">
          <div className="text-slate-400 text-lg mb-2">Final Score</div>
          <div className="text-6xl font-bold text-red-400">{props.score}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-slate-400 text-sm mb-1">Level Reached</div>
            <div className="text-3xl font-bold text-blue-400">{props.level}</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Best Score</div>
            <div className="text-3xl font-bold text-green-400">{props.highScore}</div>
          </div>
        </div>

        {isNewHighScore && (
          <div className="bg-yellow-900/60 border-2 border-yellow-500/60 rounded p-4 mb-6">
            <span className="text-2xl mr-2">🏆</span>
            <span className="font-bold text-yellow-200">NEW HIGH SCORE!</span>
          </div>
        )}
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        <Button onClick={props.onPlayAgain} variant="primary" size="large">
          🎮 Play Again
        </Button>
        <Button onClick={props.onBackToMenu} variant="secondary" size="large">
          🏠 Back to Menu
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-600">
        <Button onClick={props.onLeaderboard} variant="secondary" size="medium">
          📊 Leaderboard
        </Button>
      </div>
    </div>
  );
}
