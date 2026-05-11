import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Layout } from './components/Layout';
import { MainMenu } from './pages/MainMenu';
import { GameScreen } from './pages/GameScreen';
import { OptionsScreen } from './pages/OptionsScreen';
import { AdaptationsScreen } from './pages/AdaptationsScreen';
import { ThemeSelectionScreen } from './pages/ThemeSelectionScreen';
import { DifficultySelectionScreen } from './pages/DifficultySelectionScreen';
import { RulesScreen } from './pages/RulesScreen';
import { useGameContext } from './context/GameContext';
import { useMusicManager } from './hooks/useMusicManager';

function GlobalAudio() {
  const { settings } = useGameContext();
  useMusicManager(settings);
  return null;
}

function App() {
  return (
    <GameProvider>
      <GlobalAudio />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainMenu />} />
            <Route path="options" element={<OptionsScreen />} />
            <Route path="adaptations" element={<AdaptationsScreen />} />
            <Route path="rules" element={<RulesScreen />} />
            <Route path="theme" element={<ThemeSelectionScreen />} />
            <Route path="difficulty" element={<DifficultySelectionScreen />} />
            <Route path="game" element={<GameScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
