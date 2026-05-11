import React, { createContext, useContext } from 'react';
import { useStats } from '../hooks/useStats';
import { useSettings } from '../hooks/useSettings';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const { stats, updateStats, clearStats } = useStats();
  const { settings, updateSetting, toggleFullscreen } = useSettings();

  const value = {
    stats,
    updateStats,
    clearStats,
    settings,
    updateSetting,
    toggleFullscreen
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
