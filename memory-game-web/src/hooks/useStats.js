import { useState, useEffect, useCallback } from 'react';

const defaultStats = {
  gamesPlayed: 0,
  bestScore: 0,
  bestScoreMode: '',
  totalTime: 0,
  pairsMatched: 0,
  bestTimes: {}, // e.g. { 'theme_16': 45 }
  lastGame: null // Stores { score, time, attempts, theme, difficulty, accuracy }
};

export function useStats() {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('memoryGameStats');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultStats, ...parsed };
      }
    } catch (e) {
      console.error('Error loading stats from localStorage', e);
    }
    return defaultStats;
  });

  useEffect(() => {
    localStorage.setItem('memoryGameStats', JSON.stringify(stats));
  }, [stats]);

  const updateStats = useCallback((gameData) => {
    setStats(prev => {
      const newStats = { ...prev };
      
      // Update global aggregates
      newStats.gamesPlayed += 1;
      newStats.totalTime += gameData.time;
      newStats.pairsMatched += gameData.pairsMatched;
      
      // Update best score
      if (gameData.score > newStats.bestScore) {
        newStats.bestScore = gameData.score;
        newStats.bestScoreMode = `${gameData.theme}_${gameData.difficulty}`;
      }
      
      // Update best times for specific mode
      const themeKey = `${gameData.theme}_${gameData.difficulty}`;
      if (!newStats.bestTimes[themeKey] || gameData.time < newStats.bestTimes[themeKey]) {
        newStats.bestTimes = {
          ...newStats.bestTimes,
          [themeKey]: gameData.time
        };
      }

      // Store current game as lastGame for future comparison
      // Accuracy is calculated as (pairsMatched / attempts) * 100
      const accuracy = gameData.attempts > 0 ? (gameData.pairsMatched / gameData.attempts) * 100 : 0;
      newStats.lastGame = {
        score: gameData.score,
        time: gameData.time,
        attempts: gameData.attempts,
        theme: gameData.theme,
        difficulty: gameData.difficulty,
        accuracy: accuracy,
        timestamp: Date.now()
      };
      
      return newStats;
    });
  }, []);

  const clearStats = useCallback(() => {
    setStats(defaultStats);
    localStorage.removeItem('memoryGameStats');
  }, []);

  return { stats, updateStats, clearStats };
}
