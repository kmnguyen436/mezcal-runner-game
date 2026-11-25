'use client';

import React from 'react';
import { HUDProps } from '@/lib/types';
import Heart from '../Shared/Heart';

export default function HUD(props: HUDProps) {
  return (
    <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-left">
          <div className="text-sm text-slate-400 font-medium">Score</div>
          <div className="text-2xl font-bold text-blue-400">{props.score}</div>
        </div>

        <div className="border-l border-slate-600 h-12" />

        <div className="text-left">
          <div className="text-sm text-slate-400 font-medium">Level</div>
          <div className="text-2xl font-bold text-green-400">{props.level}</div>
        </div>

        <div className="border-l border-slate-600 h-12" />

        <div className="text-left">
          <div className="text-sm text-slate-400 font-medium">Lives</div>
          <div className="flex gap-1">
            {Array.from({ length: props.lives }).map((_, i) => (
              <Heart key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm text-slate-400 font-medium">Best Score</div>
        <div className="text-2xl font-bold text-slate-200">{props.highScore}</div>
      </div>
    </div>
  );
}
