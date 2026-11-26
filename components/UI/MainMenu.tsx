import Button from './Button';
import { MainMenuProps } from '@/lib/types';

export default function MainMenu({ onStartGame, highScore }: MainMenuProps) {
  return (
    <section className="game-card menu-card">
      <div className="menu-art" aria-hidden="true"><span>✿</span><span>🐕</span><span>✳</span></div>
      <p className="game-eyebrow">A LITTLE ADVENTURE WITH A VERY GOOD DOG</p>
      <h1>Mezcal <em>Runner.</em></h1>
      <p className="game-intro">A little romp, a few treats, and one very happy pup.</p>
      <div className="instructions">
        <h2>Before you head out...</h2>
        <ul>
          <li><span aria-hidden="true">↟</span> Jump with Space, the up arrow, or the Jump button.</li>
          <li><span aria-hidden="true">✳</span> Avoid poop, collect bones and kibble for points, and hearts for lives.</li>
          <li><span aria-hidden="true">❋</span> Focus the game area to use Space, ↑, or Esc; the buttons work too.</li>
        </ul>
        <p className="access-note">This is a visual, timed game; gameplay cues are not yet available as audio.</p>
      </div>
      <div className="menu-actions"><Button onClick={onStartGame}>Let&apos;s play <span aria-hidden="true">↗</span></Button><p>YOUR BEST <strong>{highScore}</strong></p></div>
    </section>
  );
}
