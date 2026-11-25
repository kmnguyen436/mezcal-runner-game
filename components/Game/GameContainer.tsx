'use client';

import React, { useState, useCallback } from 'react';
import { GameStatus } from '@/lib/types';
import GameCanvas from './GameCanvas';
import HUD from './HUD';
import MainMenu from '../UI/MainMenu';
import GameOver from '../UI/GameOver';
import PauseMenu from '../UI/PauseMenu';

export default function GameContainer() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mezcal_highScore');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const handleStartGame = useCallback(() => {
    setGameStatus('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsPaused(false);
  }, []);

  const handleGameOver = useCallback(() => {
    setGameStatus('gameOver');
    setIsPaused(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('mezcal_highScore', score.toString());
    }
  }, [score, highScore]);

  const handlePlayAgain = useCallback(() => {
    handleStartGame();
  }, [handleStartGame]);

  const handleBackToMenu = useCallback(() => {
    setGameStatus('menu');
    setIsPaused(false);
  }, []);

  const handleTogglePause = useCallback(() => {
    if (gameStatus === 'playing') {
      setIsPaused((prev) => !prev);
    }
  }, [gameStatus]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleScoreChange = useCallback((newScore: number) => {
    setScore(newScore);
  }, []);

  const handleLivesChange = useCallback((newLives: number) => {
    setLives(newLives);
  }, []);

  const handleLevelChange = useCallback((newLevel: number) => {
    setLevel(newLevel);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {gameStatus === 'menu' && (
          <MainMenu onStartGame={handleStartGame} highScore={highScore} />
        )}

        {gameStatus === 'playing' && (
          <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden">
            <GameCanvas
              score={score}
              lives={lives}
              level={level}
              gameStatus={gameStatus}
              isPaused={isPaused}
              onScoreChange={handleScoreChange}
              onLivesChange={handleLivesChange}
              onLevelChange={handleLevelChange}
              onGameOver={handleGameOver}
              onTogglePause={handleTogglePause}
            />
            {!isPaused && <HUD score={score} lives={lives} level={level} highScore={highScore} />}
            {isPaused && (
              <PauseMenu onResume={handleResume} onBackToMenu={handleBackToMenu} />
            )}
          </div>
        )}

        {gameStatus === 'gameOver' && (
          <GameOver
            score={score}
            level={level}
            highScore={highScore}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
            onLeaderboard={() => alert('Leaderboard feature coming soon!')}
          />
        )}
      </div>
    </div>
  );
}
