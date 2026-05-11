import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Accessibility, BookOpen, Settings, Trophy, Clock, Target, Hash } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { useTranslation } from '../utils/translations';
import { useArrowNavigation } from '../hooks/useArrowNavigation';

function formatTime(seconds) {
  if (!seconds || seconds === 0) return '0s';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remaining}s`;
  return `${remaining}s`;
}

export function MainMenu() {
  const navigate = useNavigate();
  const { stats, settings } = useGameContext();
  const { t } = useTranslation(settings.language);

  useArrowNavigation('.menu-buttons-container', settings.keyboardNavigation);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%', 
      width: '100%',
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '40px',
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: 'center' }}
      >
        <h1 className="glow-text">MEMORY GAME</h1>
        <p className="subtitle">{t('premiumEdition')}</p>
      </motion.div>

      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <GlassPanel style={{ padding: '40px', minWidth: '340px' }}>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="menu-buttons-container"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Button 
              onClick={() => navigate('/theme')} 
              variant="primary" 
              icon={Play}
              style={{ width: '100%', padding: '18px' }}
            >
              {t('playNow')}
            </Button>
            <Button 
              onClick={() => navigate('/adaptations')} 
              variant="secondary" 
              icon={Accessibility}
              style={{ width: '100%' }}
            >
              {t('accessibility')}
            </Button>
            <Button 
              onClick={() => navigate('/rules')} 
              variant="secondary" 
              icon={BookOpen}
              style={{ width: '100%' }}
            >
              {t('rules')}
            </Button>
            <Button 
              onClick={() => navigate('/options')} 
              variant="secondary" 
              icon={Settings}
              style={{ width: '100%' }}
            >
              {t('options')}
            </Button>
          </motion.div>
        </GlassPanel>

        <GlassPanel style={{ padding: '30px', minWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontSize: '0.8rem', 
              letterSpacing: '4px', 
              color: 'var(--text-dim)', 
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Trophy size={16} /> {t('stats')}
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="stats-list"
            >
              <motion.div variants={itemVariants} className="stat-row">
                <span className="label"><Hash size={12} style={{ display: 'inline', marginBottom: '-2px' }} /> {t('gamesPlayed')}</span>
                <span className="value">{stats.gamesPlayed}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-row">
                <span className="label"><Target size={12} style={{ display: 'inline', marginBottom: '-2px' }} /> {t('bestScore')}</span>
                <span className="value">{stats.bestScore}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-row">
                <span className="label"><Clock size={12} style={{ display: 'inline', marginBottom: '-2px' }} /> {t('totalTime')}</span>
                <span className="value">{formatTime(stats.totalTime)}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="stat-row">
                <span className="label"><Trophy size={12} style={{ display: 'inline', marginBottom: '-2px' }} /> {t('pairsMatched')}</span>
                <span className="value">{stats.pairsMatched}</span>
              </motion.div>
            </motion.div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
