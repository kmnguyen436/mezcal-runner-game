'use client';

import React from 'react';
import Button from './Button';
import { MainMenuProps } from '@/lib/types';

export default function MainMenu(props: MainMenuProps) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto border border-slate-700">
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">
          🐕 Mezcal Runner
        </h1>
        <p className="text-xl text-slate-300">Help Mezcal avoid poop and collect treats!</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 mb-8 border-2 border-slate-600">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">How to Play</h2>
        <ul className="text-left space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-2xl">⌨️</span>
            <span>
              Press <strong>SPACE</strong> or <strong>UP ARROW</strong> to jump
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">💩</span>
            <span>
              Avoid <strong>poop</strong> or lose a life
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🦴</span>
            <span>
              Collect <strong>bones</strong> for <strong>3 points</strong>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🥣</span>
            <span>
              Collect <strong>kibble</strong> for <strong>1 point</strong>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">❤️</span>
            <span>
              Collect <strong>heart treats</strong> for extra lives (max 10)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <span>
              Level up as you gain points to increase difficulty!
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <div className="text-slate-400 text-lg mb-2">Your Best Score</div>
        <div className="text-5xl font-bold text-green-400">{props.highScore}</div>
      </div>

      <Button onClick={props.onStartGame} variant="primary" size="large">
        🎮 Start Game
      </Button>
    </div>
  );
}
