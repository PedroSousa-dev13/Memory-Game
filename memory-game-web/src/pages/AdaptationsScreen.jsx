import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Accessibility, HelpCircle, ArrowLeft } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { Switch, Slider } from '../components/ui/Controls';
import { useTranslation } from '../utils/translations';
import { Tooltip } from '../components/ui/Tooltip';

const HelpIcon = ({ t }) => (
  <Tooltip content={
    <div>
      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '5px' }}>DICA DE ACESSIBILIDADE:</strong>
      {t('keyboardNavigationDesc')}
    </div>
  }>
    <div style={{ 
      width: '28px', 
      height: '28px', 
      borderRadius: '50%', 
      backgroundColor: 'rgba(255,255,255,0.05)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      cursor: 'help',
      border: '1px solid var(--glass-border)',
      color: 'var(--primary)',
      transition: 'all 0.3s'
    }}
    className="help-icon-hover"
    >
      <HelpCircle size={16} />
    </div>
  </Tooltip>
);

export function AdaptationsScreen() {
  const navigate = useNavigate();
  const { settings, updateSetting } = useGameContext();
  const { t } = useTranslation(settings.language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <GlassPanel style={{ padding: '40px', width: '100%', maxWidth: '650px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', position: 'relative' }}>
          <h1 className="glow-text" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Accessibility size={48} style={{ color: 'var(--primary)' }} />
            {t('accessibility').toUpperCase()}
          </h1>
          <p className="subtitle">{t('adaptationsTitle')}</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}
        >
          {/* Visual Assist */}
          <motion.div variants={itemVariants}>
            <Switch 
              label={t('visualAssist')} 
              description={t('structure')}
              checked={settings.visualFeedback} 
              onChange={(v) => updateSetting('visualFeedback', v)} 
            />
          </motion.div>

          {/* Colorblind Mode */}
          <motion.div variants={itemVariants}>
            <Switch 
              label={t('colorblindMode')} 
              description={t('colorblindModeDesc')}
              checked={settings.colorblindMode} 
              onChange={(v) => updateSetting('colorblindMode', v)} 
            />
          </motion.div>

          {/* Audio Assist */}
          <motion.div variants={itemVariants}>
            <Switch 
              label={t('audioAssist')} 
              description={t('audioAssistDesc')}
              checked={settings.audioAssist} 
              onChange={(v) => updateSetting('audioAssist', v)} 
            />
          </motion.div>

          {/* Hint / Easy Mode */}
          <motion.div variants={itemVariants}>
            <Switch 
              label={t('hint')} 
              description={t('hintDesc')}
              checked={settings.easyMode} 
              onChange={(v) => updateSetting('easyMode', v)} 
            />
          </motion.div>

          {/* Keyboard Navigation */}
          <motion.div variants={itemVariants}>
            <Switch 
              label={t('keyboardNavigation')} 
              description={t('keyboardNavigationDesc').split('.')[0] + '.'}
              checked={settings.keyboardNavigation} 
              onChange={(v) => updateSetting('keyboardNavigation', v)} 
              addon={<HelpIcon t={t} />}
            />
          </motion.div>

          {/* Text Size */}
          <motion.div variants={itemVariants}>
            <Slider 
              label={t('textSize')} 
              description={t('textSizeDesc')}
              min={0.8} max={1.5} step={0.1}
              value={settings.textSizeFactor} 
              onChange={(v) => updateSetting('textSizeFactor', v)} 
            />
          </motion.div>
        </motion.div>
        
        <Button onClick={() => navigate('/')} variant="secondary" icon={ArrowLeft} style={{ width: '100%' }}>
          {t('backToMenu')}
        </Button>
      </GlassPanel>
    </div>
  );
}
