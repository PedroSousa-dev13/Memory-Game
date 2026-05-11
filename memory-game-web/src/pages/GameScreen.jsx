import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Hash, RotateCcw, LogOut, Play, Settings, X, ArrowLeft } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { useSoundManager } from '../hooks/useSoundManager';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { WinModal } from '../components/WinModal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { Switch, Slider } from '../components/ui/Controls';
import { useTranslation } from '../utils/translations';
import { GameCard } from '../components/ui/GameCard';
import { GameHUD } from '../components/ui/GameHUD';

function formatStatsTime(seconds) {
  if (!seconds || seconds === 0) return '0s';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

function formatScoreMode(modeKey) {
  if (!modeKey) return '';
  const parts = modeKey.split('_');
  const difficulty = parts.pop();
  const theme = parts.join(' ')
    .replace('baralho ', '')
    .replace('preto e branco', '(P&B)')
    .toUpperCase();
  return `${theme} - ${difficulty} Peças`;
}

function formatTimer(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function GameScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stats, updateStats, settings, updateSetting } = useGameContext();
  const { t } = useTranslation(settings.language);
  
  const [showBoa, setShowBoa] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [pendingExitAction, setPendingExitAction] = useState(null); // 'menu' or 'restart'
  
  const [shakingCards, setShakingCards] = useState([]);
  const [matchedAnimationCards, setMatchedAnimationCards] = useState([]);
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
  
  const theme = location.state?.theme || 'baralho_animais';
  const difficulty = location.state?.difficulty || 16;
  const gameMode = location.state?.gameMode || 'single';

  const {
    cards,
    score,
    timer,
    multiplier,
    matchedPairs,
    totalPairs,
    attempts,
    currentPlayer,
    playerScores,
    isPaused,
    easyModeUsed,
    togglePause,
    initGame,
    handleCardClick,
    revealAllTemporarily,
    isChecking,
    isPlaying
  } = useGameLogic({
    onMatchSuccess: (ids) => {
      setMatchedAnimationCards(ids);
      setShowBoa(true);
      setTimeout(() => setMatchedAnimationCards([]), 1000);
    },
    onMatchFail: (ids) => {
      setShakingCards(ids);
      playMismatch();
      setTimeout(() => setShakingCards([]), 800);
    }
  });

  const { playFlip, playMatch, playMismatch, playWin, playCardSound } = useSoundManager(settings, theme);

  // Initial Game Init
  useEffect(() => {
    initGame(theme, difficulty, settings.colorblindMode, gameMode);
  }, [theme, difficulty, initGame, settings.colorblindMode, gameMode]);

  const isWinModalOpen = matchedPairs === totalPairs && totalPairs > 0;
  const isAnyModalOpen = isPaused || isExitConfirmOpen || isWinModalOpen || isSettingsOpen;

  // Auto-focus first element when any modal opens
  useEffect(() => {
    if (isAnyModalOpen) {
      setTimeout(() => {
        const focusable = document.querySelector('.modal-content button, .modal-content input, .modal-content [role="button"]');
        if (focusable) focusable.focus();
      }, 150);
    }
  }, [isAnyModalOpen, isSettingsOpen]);

  // Handle Win
  useEffect(() => {
    if (!isPlaying && matchedPairs === totalPairs && totalPairs > 0) {
      updateStats({
        score,
        time: timer,
        theme,
        difficulty,
        pairsMatched: totalPairs,
        attempts,
        gameMode
      });
      playWin();
    }
  }, [isPlaying, matchedPairs, totalPairs, score, timer, theme, difficulty, updateStats, attempts, gameMode, playWin]);

  useEffect(() => {
    if (showBoa) {
      playMatch();
      const t = setTimeout(() => setShowBoa(false), 800);
      return () => clearTimeout(t);
    }
  }, [showBoa, playMatch]);

  const onCardClick = useCallback((card) => {
    if (card.isFlipped || card.isMatched || isAnyModalOpen) return;
    
    playFlip();
    
    const isSecondCard = cards.filter(c => c.isFlipped && !c.isMatched).length === 1;
    const firstFlippedCard = cards.find(c => c.isFlipped && !c.isMatched);
    const isMatch = isSecondCard && firstFlippedCard && firstFlippedCard.image === card.image;

    if (!isMatch) {
      playCardSound(card.image);
    }
    
    handleCardClick(card);
  }, [cards, isAnyModalOpen, playFlip, playCardSound, handleCardClick]);

  const rows = Math.ceil(Math.sqrt(difficulty * 0.75));
  const cols = Math.ceil(difficulty / rows);

  // Keyboard Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnyModalOpen) {
        if (e.key === 'Escape') {
          if (isExitConfirmOpen) setIsExitConfirmOpen(false);
          else if (isSettingsOpen) setIsSettingsOpen(false);
          else if (isPaused) togglePause();
          return;
        }

        const focusableElements = document.querySelectorAll('.modal-content button, .modal-content input, .modal-content [role="button"]');
        if (focusableElements.length === 0) return;

        const activeElement = document.activeElement;
        let index = Array.from(focusableElements).indexOf(activeElement);

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          const nextIndex = (index + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
          e.preventDefault();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
          focusableElements[prevIndex].focus();
          e.preventDefault();
        }
        return;
      }

      if (e.key === 'Escape') {
        togglePause();
        return;
      }

      let newIndex = focusedCardIndex;
      const isNavigationKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key);

      if (!isNavigationKey || !settings.keyboardNavigation) return;

      if (focusedCardIndex === -1) {
        newIndex = 0;
      } else {
        if (e.key === 'ArrowRight') {
          newIndex = Math.min(cards.length - 1, focusedCardIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          newIndex = Math.max(0, focusedCardIndex - 1);
        } else if (e.key === 'ArrowDown') {
          newIndex = Math.min(cards.length - 1, focusedCardIndex + cols);
        } else if (e.key === 'ArrowUp') {
          newIndex = Math.max(0, focusedCardIndex - cols);
        } else if (e.key === 'Enter' || e.key === ' ') {
          onCardClick(cards[focusedCardIndex]);
        }
      }

      if (newIndex !== focusedCardIndex) {
        e.preventDefault();
        setFocusedCardIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedCardIndex, cards, cols, isAnyModalOpen, isPaused, isExitConfirmOpen, isSettingsOpen, togglePause, onCardClick, settings.keyboardNavigation]);

  const confirmExit = () => {
    setIsExitConfirmOpen(false);
    if (pendingExitAction === 'menu') navigate('/');
    else initGame(theme, difficulty, settings.colorblindMode, gameMode);
  };

  const handleExitRequest = (action = 'menu') => {
    if (isPlaying && matchedPairs < totalPairs && matchedPairs > 0) {
      setPendingExitAction(action);
      setIsExitConfirmOpen(true);
      if (!isPaused) togglePause();
    } else {
      if (action === 'menu') navigate('/');
      else initGame(theme, difficulty, settings.colorblindMode, gameMode);
    }
  };

  // Memoized Grid to prevent re-renders when timer updates
  const memoizedGrid = useMemo(() => (
    <motion.div id="game-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {cards.map((card, index) => (
        <GameCard 
          key={card.id}
          card={card}
          index={index}
          isFocused={focusedCardIndex === index}
          isShaking={shakingCards.includes(card.id)}
          isMatchedAnim={matchedAnimationCards.includes(card.id)}
          theme={theme}
          onClick={() => { setFocusedCardIndex(index); onCardClick(card); }}
          t={t}
        />
      ))}
    </motion.div>
  ), [cards, cols, rows, focusedCardIndex, shakingCards, matchedAnimationCards, theme, onCardClick, t]);

  return (
    <div id="game-container">
      <WinModal 
        isOpen={isWinModalOpen}
        score={score}
        time={formatTimer(timer)}
        attempts={attempts}
        totalPairs={totalPairs}
        gameMode={gameMode}
        playerScores={playerScores}
        isNewRecord={!stats.bestTimes[`${theme}_${difficulty}`] || timer < stats.bestTimes[`${theme}_${difficulty}`]}
        onRestart={() => initGame(theme, difficulty, settings.colorblindMode, gameMode)}
        onMenu={() => navigate('/')}
        scoreDisplay={settings.scoreDisplay}
        timerDisplay={settings.timerDisplay}
        lastGame={stats.lastGame}
      />

      <ConfirmModal 
        isOpen={isExitConfirmOpen}
        onConfirm={confirmExit}
        onCancel={() => setIsExitConfirmOpen(false)}
      />

      {/* BOA Overlay */}
      <AnimatePresence>
        {showBoa && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, pointerEvents: 'none' }}>
            <GlassPanel style={{ padding: '15px 40px', border: '2px solid var(--success)' }}>
              <h1 className="glow-text" style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(to bottom, #fff, var(--success))', WebkitBackgroundClip: 'text' }}>{t('boa')}</h1>
              {settings?.scoreDisplay !== false && gameMode === 'single' && (
                <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--success)' }}>+{1 * multiplier}</div>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaused && !isExitConfirmOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="modal-overlay">
            {!isSettingsOpen ? (
              <GlassPanel className="modal-content" style={{ width: '400px' }}>
                <h1 className="glow-text" style={{ fontSize: '3rem' }}>{t('pause')}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '30px' }}>
                  <Button variant="primary" icon={Play} onClick={togglePause}>{t('resume')}</Button>
                  <Button variant="secondary" icon={Settings} onClick={() => setIsSettingsOpen(true)}>{t('options')}</Button>
                  <Button variant="secondary" icon={LogOut} onClick={() => handleExitRequest('menu')}>{t('exit')}</Button>
                </div>
              </GlassPanel>
            ) : (
              <GlassPanel className="modal-content" style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h1 className="glow-text" style={{ fontSize: '2rem' }}>{t('settings')}</h1>
                  <Button variant="secondary" onClick={() => setIsSettingsOpen(false)} style={{ padding: '10px' }}><X size={20} /></Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px', textAlign: 'left' }}>
                  <Slider label={t('masterVolume')} min={0} max={1} step={0.01} value={settings.masterVolume} onChange={(v) => updateSetting('masterVolume', v)} />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <div className="mini-settings-card">
                      <Switch label={t('music')} checked={settings.music} onChange={(v) => updateSetting('music', v)} />
                      <Slider min={0} max={1} step={0.01} value={settings.musicVolume} onChange={(v) => updateSetting('musicVolume', v)} />
                    </div>
                    <div className="mini-settings-card">
                      <Switch label={t('sfx')} checked={settings.sfx} onChange={(v) => updateSetting('sfx', v)} />
                      <Slider min={0} max={1} step={0.01} value={settings.sfxVolume} onChange={(v) => updateSetting('sfxVolume', v)} />
                    </div>
                    <div className="mini-settings-card">
                      <Switch label={t('uiSounds')} checked={settings.uiSounds} onChange={(v) => updateSetting('uiSounds', v)} />
                      <Slider min={0} max={1} step={0.01} value={settings.uiVolume} onChange={(v) => updateSetting('uiVolume', v)} />
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <Switch label={t('colorblindMode')} checked={settings.colorblindMode} onChange={(v) => updateSetting('colorblindMode', v)} />
                    <Slider label={t('textSize')} min={0.8} max={1.5} step={0.1} value={settings.textSizeFactor} onChange={(v) => updateSetting('textSizeFactor', v)} />
                  </div>
                </div>
                <Button onClick={() => setIsSettingsOpen(false)} variant="primary" icon={ArrowLeft} style={{ width: '100%' }}>{t('resume')}</Button>
              </GlassPanel>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <GameHUD 
        settings={settings}
        gameMode={gameMode}
        score={score}
        timer={timer}
        currentPlayer={currentPlayer}
        playerScores={playerScores}
        multiplier={multiplier}
        easyModeUsed={easyModeUsed}
        onRevealAll={revealAllTemporarily}
        onTogglePause={togglePause}
        t={t}
      />

      <div className="layout-body">
        <aside className="glass-panel sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', opacity: 0.7, marginBottom: '20px' }}><Trophy size={18} className="glow-icon" /> {t('state')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="sidebar-stat">
                <div className="stat-label"><Target size={14} /> {t('bestScore')}</div>
                <div className="stat-value glow-text" style={{ fontSize: '1.8rem' }}>{stats.bestScore}</div>
                {stats.bestScoreMode && (<div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '2px', textTransform: 'uppercase' }}>{formatScoreMode(stats.bestScoreMode)}</div>)}
              </div>
              <div className="sidebar-stat">
                <div className="stat-label"><Hash size={14} /> {t('progress')}</div>
                <div className="stat-value" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{matchedPairs} <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>/ {totalPairs || 8}</span></div>
                <div className="progress-track"><motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${(matchedPairs / (totalPairs || 1)) * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} /></div>
              </div>
              <AnimatePresence>
                {multiplier > 1 && gameMode === 'single' && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="sidebar-stat combo-box">
                    <div className="stat-label" style={{ color: 'var(--accent)' }}>{t('combo')}</div>
                    <div className="stat-value glow-text" style={{ color: 'var(--accent)', fontSize: '2rem' }}>x{multiplier}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Button variant="secondary" icon={RotateCcw} onClick={() => handleExitRequest('restart')} style={{ width: '100%', fontSize: '0.9rem', padding: '15px' }}>{t('restart')}</Button>
          </div>
        </aside>

        <section id="grid-area" className={isChecking ? 'grid-checking' : ''}>
          {memoizedGrid}
        </section>

        <aside className="glass-panel sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', opacity: 0.7 }}><Trophy size={18} className="glow-icon" /> {t('records')}</h2>
          <div className="scrollable-list custom-scroll" style={{ flex: 1, paddingRight: '10px' }}>
            {[
              { id: 'FÁCIL', color: 'var(--primary)', filter: (k) => k.endsWith('_16') || k.endsWith('_20') },
              { id: 'MÉDIO', color: 'var(--accent)', filter: (k) => k.endsWith('_24') || k.endsWith('_30') },
              { id: 'DIFÍCIL', color: 'var(--success)', filter: (k) => k.endsWith('_36') || k.endsWith('_42') }
            ].filter(cat => cat.filter(theme + '_' + difficulty)).map(cat => (
              <div key={cat.id} className="record-group">
                <div className="record-header" style={{ color: cat.color }}>{t('records')} {cat.id}</div>
                <div className="record-items">
                  {Object.entries(stats.bestTimes || {}).filter(([key]) => key.startsWith(theme) && cat.filter(key)).sort((a, b) => a[1] - b[1]).slice(0, 5).map(([key, time], index) => (
                    <div key={key} className={`record-row ${index === 0 ? 'top-record' : ''}`}><span className="rank">#{index + 1}</span><span className="info">{key.split('_').pop()} {t('cardsCount').split(' ')[1]}</span><span className="time">{formatStatsTime(time)}</span></div>
                  ))}
                  {Object.entries(stats.bestTimes || {}).filter(([key]) => key.startsWith(theme) && cat.filter(key)).length === 0 && (<div className="no-records">{t('noRecords')}</div>)}
                </div>
              </div>
            ))}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <div className="record-header" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{t('recentHistory')}</div>
              <div className="record-items" style={{ opacity: 0.6 }}>
                 <div className="record-row" style={{ fontSize: '0.75rem' }}><span className="info">{t('totalGames')}</span><span className="time" style={{ color: 'var(--text-main)' }}>{stats.gamesPlayed}</span></div>
                 <div className="record-row" style={{ fontSize: '0.75rem' }}><span className="info">{t('pairsMatched')}</span><span className="time" style={{ color: 'var(--text-main)' }}>{stats.pairsMatched}</span></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
