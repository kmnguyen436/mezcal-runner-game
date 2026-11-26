import { useEffect, useRef } from 'react';
import Button from './Button';

interface PauseMenuProps {
  onResume: () => void;
  onBackToMenu: () => void;
}

export default function PauseMenu({ onResume, onBackToMenu }: PauseMenuProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <section className="pause-menu" aria-labelledby="pause-heading">
      <h2 id="pause-heading" ref={headingRef} tabIndex={-1}>Taking a little break.</h2>
      <p>The game is paused. Ready when you are.</p>
      <div className="end-actions"><Button onClick={onResume}>Resume</Button><Button onClick={onBackToMenu} variant="secondary">Back to menu</Button></div>
    </section>
  );
}
