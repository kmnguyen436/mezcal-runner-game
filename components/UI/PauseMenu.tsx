'use client';

import React from 'react';
import Button from './Button';

interface PauseMenuProps {
  onResume: () => void;
  onBackToMenu: () => void;
}

export default function PauseMenu(props: PauseMenuProps) {
  return (
    <div className="bg-slate-800 border-t border-slate-700 px-6 py-8 flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">Game Paused</h2>
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button onClick={props.onResume} variant="primary" size="medium">
          ▶️ Resume
        </Button>
        <Button onClick={props.onBackToMenu} variant="secondary" size="medium">
          🏠 Back to Menu
        </Button>
      </div>
      <p className="text-sm text-slate-400 mt-2">Press ESC to resume</p>
    </div>
  );
}
