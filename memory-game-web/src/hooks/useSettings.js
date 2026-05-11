import { useState, useEffect } from 'react';

const defaultSettings = {
  fullscreen: false,
  music: true,
  musicVolume: 0.5,
  masterVolume: 1.0,
  sfx: true,
  sfxVolume: 1.0,
  uiSounds: true,
  uiVolume: 0.8,
  scoreDisplay: true,
  timerDisplay: true,
  easyMode: false,
  visualFeedback: true,
  audioAssist: false,
  colorblindMode: false,
  textSizeFactor: 1.0,
  keyboardNavigation: true,
  language: 'pt'
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('memoryGameSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('memoryGameSettings', JSON.stringify(settings));
  }, [settings]);

  // Fullscreen Sync (Detect F11 and API changes)
  useEffect(() => {
    const mq = window.matchMedia('(display-mode: fullscreen)');
    
    const handleFullscreenChange = (e) => {
      const isCurrentlyFull = 
        e.matches || 
        !!document.fullscreenElement || 
        (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height);
        
      setSettings(prev => {
        if (prev.fullscreen === isCurrentlyFull) return prev;
        return { ...prev, fullscreen: isCurrentlyFull };
      });
    };

    // Listen to media query, API event and window resize
    mq.addEventListener('change', handleFullscreenChange);
    document.addEventListener('fullscreenchange', () => handleFullscreenChange(mq));
    window.addEventListener('resize', () => handleFullscreenChange(mq));
    
    return () => {
      mq.removeEventListener('change', handleFullscreenChange);
      document.removeEventListener('fullscreenchange', () => handleFullscreenChange(mq));
      window.removeEventListener('resize', () => handleFullscreenChange(mq));
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => updateSetting('fullscreen', true))
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => updateSetting('fullscreen', false))
        .catch(() => {});
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting, toggleFullscreen };
}
