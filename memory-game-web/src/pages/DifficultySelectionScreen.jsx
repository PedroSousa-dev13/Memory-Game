import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Flame, ChevronRight, ArrowLeft, Trophy, User, Users } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { useTranslation } from '../utils/translations';
import { useGameContext } from '../context/GameContext';
import { useArrowNavigation } from '../hooks/useArrowNavigation';

export function DifficultySelectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useGameContext();
  const { t } = useTranslation(settings.language);
  const theme = location.state?.theme || 'baralho_animais';
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [gameMode, setGameMode] = useState('single'); // 'single' or 'multi'

  useArrowNavigation('.difficulty-container', settings.keyboardNavigation);

  const handleSelect = (difficulty) => {
    navigate('/game', { state: { theme, difficulty, gameMode } });
  };

  const categories = [
    { 
      id: t('easy'), 
      color: 'var(--primary)', 
      icon: ShieldCheck,
      options: [
        { value: 16, label: `4x4 (${t('cardsCount').replace('{{count}}', 16)})` },
        { value: 20, label: `5x4 (${t('cardsCount').replace('{{count}}', 20)})` }
      ]
    },
    { 
      id: t('medium'), 
      color: 'var(--accent)', 
      icon: Zap,
      options: [
        { value: 24, label: `6x4 (${t('cardsCount').replace('{{count}}', 24)})` },
        { value: 30, label: `6x5 (${t('cardsCount').replace('{{count}}', 30)})` }
      ]
    },
    { 
      id: t('hard'), 
      color: 'var(--success)', 
      icon: Flame,
      options: [
        { value: 36, label: `6x6 (${t('cardsCount').replace('{{count}}', 36)})` },
        { value: 42, label: `7x6 (${t('cardsCount').replace('{{count}}', 42)})` }
      ]
    },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <GlassPanel className="difficulty-container" style={{ padding: '40px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', position: 'relative' }}>
          <h1 className="glow-text" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Trophy size={48} style={{ color: 'var(--primary)' }} />
            {t('challenge')}
          </h1>
          <p className="subtitle">{t('selectDifficulty')}</p>
        </div>

        {/* Game Mode Selector */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '25px', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          padding: '8px', 
          borderRadius: '16px',
          border: '1px solid var(--glass-border)'
        }}>
          <button 
            onClick={() => setGameMode('single')}
            style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: gameMode === 'single' ? 'var(--primary)' : 'transparent',
              color: 'white',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
          >
            <User size={18} />
            {t('singlePlayer')}
          </button>
          <button 
            onClick={() => setGameMode('multi')}
            style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: gameMode === 'multi' ? 'var(--primary)' : 'transparent',
              color: 'white',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
          >
            <Users size={18} />
            {t('multiPlayer')}
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button 
                onClick={() => toggleCategory(cat.id)} 
                variant="secondary" 
                icon={cat.icon}
                style={{ 
                  width: '100%', 
                  justifyContent: 'space-between',
                  borderLeft: `4px solid ${cat.color}`,
                  padding: '20px 24px',
                  backgroundColor: expandedCategory === cat.id ? 'hsla(0, 0%, 100%, 0.1)' : 'hsla(0, 0%, 100%, 0.05)'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>{cat.id}</span>
                <motion.div
                  animate={{ rotate: expandedCategory === cat.id ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronRight size={20} style={{ color: cat.color }} />
                </motion.div>
              </Button>

              <AnimatePresence>
                {expandedCategory === cat.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 10px' }}
                  >
                    {cat.options.map((opt) => (
                      <Button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        variant="secondary"
                        style={{ 
                          width: '100%', 
                          fontSize: '0.9rem',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--glass-border)',
                          padding: '12px 20px'
                        }}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <Button onClick={() => navigate('/theme')} variant="secondary" icon={ArrowLeft} style={{ width: '100%' }}>
          {t('backToThemes')}
        </Button>
      </GlassPanel>
    </div>
  );
}
