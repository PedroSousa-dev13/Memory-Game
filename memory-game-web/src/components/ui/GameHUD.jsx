import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Eye, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

function formatTimer(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export const GameHUD = React.memo(function GameHUD({ 
  settings, 
  gameMode, 
  score, 
  timer, 
  currentPlayer, 
  playerScores, 
  multiplier, 
  easyModeUsed, 
  onRevealAll, 
  onTogglePause, 
  t 
}) {
  if (!settings?.scoreDisplay && !settings?.timerDisplay) return null;

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -50, opacity: 0 }} 
      className="glass-panel hud"
    >
      <div style={{ display: 'flex', gap: '40px' }}>
        {gameMode === 'single' ? (
          <>
            {settings?.scoreDisplay && (
              <div className="hud-item">
                <span className="label">{t('points')}</span>
                <div className="value glow-text" style={{ fontSize: '2.2rem' }}>{score}</div>
              </div>
            )}
            {settings?.timerDisplay && (
              <div className="hud-item">
                <span className="label">{t('time')}</span>
                <div className="value glow-text" style={{ fontSize: '2.2rem' }}>{formatTimer(timer)}</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`hud-item ${currentPlayer === 0 ? 'active-player' : ''}`} style={{ opacity: currentPlayer === 0 ? 1 : 0.5, transition: 'all 0.3s' }}>
              <span className="label" style={{ color: currentPlayer === 0 ? 'var(--primary)' : 'inherit' }}>{t('player1')}</span>
              <div className="value glow-text" style={{ fontSize: '2.2rem' }}>{playerScores[0]}</div>
            </div>
            <div className={`hud-item ${currentPlayer === 1 ? 'active-player' : ''}`} style={{ opacity: currentPlayer === 1 ? 1 : 0.5, transition: 'all 0.3s' }}>
              <span className="label" style={{ color: currentPlayer === 1 ? 'var(--primary)' : 'inherit' }}>{t('player2')}</span>
              <div className="value glow-text" style={{ fontSize: '2.2rem' }}>{playerScores[1]}</div>
            </div>
            <div className="hud-item" style={{ marginLeft: '20px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
               <span className="label">{t('turn')}</span>
               <div className="value" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{currentPlayer === 0 ? t('player1') : t('player2')}</div>
            </div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {settings?.easyMode && !easyModeUsed && (
          <Button variant="secondary" icon={Eye} onClick={() => onRevealAll()}>{t('hintHUD')}</Button>
        )}
        <Button variant="secondary" icon={Pause} onClick={onTogglePause}>{t('pause')}</Button>
      </div>
    </motion.header>
  );
});
