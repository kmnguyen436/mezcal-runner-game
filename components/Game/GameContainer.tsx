'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import type { GameStatus } from '@/lib/game/constants';
import GameCanvas from './GameCanvas';
import HUD from './HUD';
import MainMenu from '../UI/MainMenu';
import GameOver from '../UI/GameOver';
import PauseMenu from '../UI/PauseMenu';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getStoredScore() {
  try {
    return window.localStorage.getItem('mezcal_highScore') ?? '';
  } catch {
    return 'unavailable';
  }
}

function getServerScore() {
  return '';
}

export default function GameContainer() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionHighScore, setSessionHighScore] = useState(0);
  const [storageFailed, setStorageFailed] = useState(false);
  const storedScore = useSyncExternalStore(subscribeToStorage, getStoredScore, getServerScore);
  const parsedScore = Number(storedScore);
  const highScore = Math.max(sessionHighScore, Number.isFinite(parsedScore) && parsedScore >= 0 ? parsedScore : 0);
  const storageAvailable = storedScore !== 'unavailable' && !storageFailed;

  const handleStartGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsPaused(false);
    setGameStatus('playing');
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameStatus('gameOver');
    setIsPaused(false);
    if (finalScore > highScore) {
      setSessionHighScore(finalScore);
      try {
        window.localStorage.setItem('mezcal_highScore', String(finalScore));
      } catch {
        setStorageFailed(true);
      }
    }
  }, [highScore]);

  const handleBackToMenu = useCallback(() => {
    setGameStatus('menu');
    setIsPaused(false);
  }, []);
  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleTogglePause = useCallback(() => setIsPaused((paused) => !paused), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  return (
    <div className="game-shell">
      <div className="game-frame">
        <div className="game-topline"><span>✳ &nbsp; KAYLA&apos;S LITTLE ARCADE</span><span>EST. FOR MEZCAL</span></div>
        {gameStatus === 'menu' && <MainMenu onStartGame={handleStartGame} highScore={highScore} />}
        {gameStatus === 'playing' && (
          <div className="game-card">
            <div className="game-playing-heading"><div><p className="game-eyebrow">A LITTLE ADVENTURE</p><h1>Mezcal <em>Runner.</em></h1></div><span aria-hidden="true">✿</span></div>
            <GameCanvas
              isPaused={isPaused}
              onScoreChange={setScore}
              onLivesChange={setLives}
              onLevelChange={setLevel}
              onGameOver={handleGameOver}
              onPause={handlePause}
              onTogglePause={handleTogglePause}
            />
            <HUD score={score} lives={lives} level={level} highScore={highScore} />
            {isPaused && <PauseMenu onResume={handleResume} onBackToMenu={handleBackToMenu} />}
          </div>
        )}
        {gameStatus === 'gameOver' && (
          <GameOver score={score} level={level} highScore={highScore} onPlayAgain={handleStartGame} onBackToMenu={handleBackToMenu} />
        )}
        {!storageAvailable && <p className="storage-note" role="status">Best scores can&apos;t be saved in this browser or embedded view; they will last for this visit only.</p>}
        <p className="game-footer">MADE WITH CARE <span aria-hidden="true">✳</span> &nbsp; FOR GOOD DOGS EVERYWHERE</p>
      </div>
    </div>
  );
}
