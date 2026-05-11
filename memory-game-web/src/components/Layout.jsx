import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { BackgroundEffects } from './ui/BackgroundEffects';

export function Layout() {
  const { settings } = useGameContext();

  React.useEffect(() => {
    const rawFactor = settings.textSizeFactor || 1.0;
    const cappedFactor = Math.min(rawFactor, 1.5);
    // Rename to --font-scale to reflect that it only affects typography
    document.documentElement.style.setProperty('--font-scale', cappedFactor);
  }, [settings.textSizeFactor]);

  return (
    <div className={`layout-root ${settings.colorblindMode ? 'colorblind-mode' : ''}`}>
      <BackgroundEffects />
      <main id="game-container" style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
