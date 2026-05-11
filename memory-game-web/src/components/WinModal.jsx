import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Home, Star, Target, Hash, BarChart2, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { GlassPanel } from './ui/GlassPanel';
import { useGameContext } from '../context/GameContext';
import { useTranslation } from '../utils/translations';

export const WinModal = React.memo(function WinModal({ 
  isOpen, 
  score, 
  time, 
  attempts, 
  totalPairs,
  gameMode, 
  playerScores, 
  isNewRecord, 
  onRestart, 
  onMenu, 
  scoreDisplay = true, 
  timerDisplay = true,
  lastGame = null
}) {
  const { settings } = useGameContext();
  const { t } = useTranslation(settings.language);

  // Calculate Accuracy
  const accuracy = attempts > 0 ? Math.round((totalPairs / attempts) * 100) : 0;
  
  // Wait, let's just use a more reliable way. I'll pass totalPairs to the component.
  // For now let's assume totalPairs is derived from score if single player, but that's risky.
  // I will update GameScreen to pass totalPairs.
  
  // Calculate time comparison if lastGame exists and is same mode
  let timeDiff = null;
  if (lastGame && gameMode === 'single') {
    const currentSecs = parseTimeToSeconds(time);
    timeDiff = lastGame.time - currentSecs;
  }

  function parseTimeToSeconds(timeStr) {
    const [m, s] = timeStr.split(':').map(Number);
    return m * 60 + s;
  }

  const getMultiplayerResult = () => {
    if (playerScores[0] > playerScores[1]) return t('victoryPlayer1');
    if (playerScores[1] > playerScores[0]) return t('victoryPlayer2');
    return t('draw');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="modal-overlay">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <GlassPanel className="modal-content" style={{ textAlign: 'center', width: '550px', border: '2px solid var(--primary)', padding: '40px' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                <Trophy size={80} style={{ color: '#ffd700', filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' }} />
                {isNewRecord && (
                  <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: -10, right: -10 }}>
                    <Star size={32} fill="#ffd700" color="#ffd700" />
                  </motion.div>
                )}
              </div>

              <h1 className="glow-text" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                {gameMode === 'multi' ? getMultiplayerResult() : t('victory')}
              </h1>
              <p className="subtitle" style={{ marginBottom: '30px' }}>{isNewRecord ? t('newRecord') : t('challenge')}</p>
              
              {/* Rich Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                {timerDisplay && (
                  <div className="win-stat-card">
                    <div className="win-stat-label"><Clock size={14} /> {t('time')}</div>
                    <div className="win-stat-value" style={{ color: 'var(--primary)' }}>{time}</div>
                    {timeDiff !== null && (
                       <div style={{ fontSize: '0.7rem', color: timeDiff >= 0 ? 'var(--success)' : 'var(--accent)', fontWeight: 'bold' }}>
                          {timeDiff >= 0 ? `-${timeDiff}s ${t('betterThanAverage')}` : `+${Math.abs(timeDiff)}s ${t('worseThanAverage')}`}
                       </div>
                    )}
                  </div>
                )}
                {scoreDisplay && gameMode === 'single' && (
                  <div className="win-stat-card">
                    <div className="win-stat-label"><Target size={14} /> {t('points')}</div>
                    <div className="win-stat-value" style={{ color: 'var(--accent)' }}>{score}</div>
                  </div>
                )}
                <div className="win-stat-card">
                  <div className="win-stat-label"><Hash size={14} /> {t('attempts')}</div>
                  <div className="win-stat-value">{attempts}</div>
                </div>
                <div className="win-stat-card">
                  <div className="win-stat-label"><BarChart2 size={14} /> {t('accuracy')}</div>
                  <div className="win-stat-value" style={{ color: 'var(--success)' }}>
                    {accuracy}%
                  </div>
                </div>
              </div>

              {gameMode === 'multi' && (
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{t('player1')}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{playerScores[0]}</div>
                  </div>
                  <div style={{ fontSize: '1.5rem', opacity: 0.3, alignSelf: 'center' }}>VS</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{t('player2')}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{playerScores[1]}</div>
                  </div>
                </div>
              )}

              {isNewRecord && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="new-record-badge"
                >
                  <Star size={18} fill="#ffd700" />
                  {t('newRecord')}
                  <Star size={18} fill="#ffd700" />
                </motion.div>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                <Button variant="primary" icon={RotateCcw} onClick={onRestart} style={{ flex: 1 }}>{t('restart')}</Button>
                <Button variant="secondary" icon={Home} onClick={onMenu} style={{ flex: 1 }}>{t('backToMenu')}</Button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
