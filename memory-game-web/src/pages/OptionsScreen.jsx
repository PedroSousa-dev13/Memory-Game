import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Volume2, Music, Monitor, ArrowLeft, Trash2, Globe, Speaker, HelpCircle } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { Switch, Slider } from '../components/ui/Controls';
import { useTranslation } from '../utils/translations';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { Tooltip } from '../components/ui/Tooltip';

const SectionHeader = ({ icon: Icon, title, helpText }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    marginBottom: '12px', 
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '6px'
  }}>
    <Icon size={16} style={{ color: 'var(--primary)' }} />
    <span style={{ 
      fontSize: '0.75rem', 
      fontWeight: '800', 
      letterSpacing: '1.5px', 
      textTransform: 'uppercase',
      color: 'var(--text-dim)',
      flex: 1
    }}>
      {title}
    </span>
    {helpText && (
      <Tooltip content={helpText}>
        <div style={{ cursor: 'help', opacity: 0.4, color: 'var(--primary)', display: 'flex' }}>
          <HelpCircle size={14} />
        </div>
      </Tooltip>
    )}
  </div>
);

export function OptionsScreen() {
  const navigate = useNavigate();
  const { settings, updateSetting, toggleFullscreen, clearStats } = useGameContext();
  const { t } = useTranslation(settings.language);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const handleClearStats = () => {
    clearStats();
    setIsConfirmOpen(false);
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onConfirm={handleClearStats}
        onCancel={() => setIsConfirmOpen(false)}
        title={t('clearStats')}
        description={t('confirmExitDesc')}
      />

      <GlassPanel style={{ padding: '40px 60px', width: '100%', maxWidth: '950px', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="glow-text" style={{ fontSize: '2.8rem', marginBottom: '0' }}>
            {t('options').toUpperCase()}
          </h1>
          <p className="subtitle" style={{ fontSize: '0.9rem', opacity: 0.6 }}>{t('settings')}</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Top Row: Language and Display */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' }}>
            <motion.div variants={itemVariants}>
              <SectionHeader icon={Globe} title={t('language')} />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 20px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)'
              }}>
                <span style={{ fontSize: '1rem', fontWeight: '600' }}>{t('language')}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['pt', 'en'].map(lang => (
                    <Button 
                      key={lang}
                      onClick={() => updateSetting('language', lang)} 
                      variant={settings.language === lang ? 'primary' : 'secondary'}
                      style={{ padding: '8px 18px', fontSize: '0.85rem', minWidth: '55px' }}
                    >
                      {lang.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeader 
                icon={Monitor} 
                title={t('immersiveMode')} 
                helpText={`${t('fullscreen')}: ${t('keyboardNavigationDesc')}\n\n${t('immersiveMode')}: ${t('immersiveModeDesc')}`}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Switch 
                  label={t('fullscreen')} 
                  checked={settings.fullscreen} 
                  onChange={toggleFullscreen} 
                />
                <Switch 
                  label={t('immersiveMode')} 
                  checked={!settings.scoreDisplay} 
                  onChange={(v) => {
                    updateSetting('scoreDisplay', !v);
                    updateSetting('timerDisplay', !v);
                  }} 
                />
              </div>
            </motion.div>
          </div>

          {/* Section: Audio */}
          <motion.div variants={itemVariants}>
            <SectionHeader icon={Speaker} title={t('masterVolume')} />
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '25px 30px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
              <div style={{ marginBottom: '20px' }}>
                <Slider 
                  label={t('masterVolume')} 
                  min={0} max={1} step={0.01}
                  value={settings.masterVolume} 
                  onChange={(v) => updateSetting('masterVolume', v)} 
                />
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px'
              }}>
                {[
                  { id: 'music', icon: Music, label: t('music'), vol: 'musicVolume' },
                  { id: 'sfx', icon: Volume2, label: t('sfx'), vol: 'sfxVolume' },
                  { id: 'uiSounds', icon: Settings, label: t('uiSounds'), vol: 'uiVolume' }
                ].map(cat => (
                  <div key={cat.id} className="mini-settings-card" style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <cat.icon size={16} style={{ opacity: 0.6 }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{cat.label}</span>
                      </div>
                      <Switch 
                        checked={settings[cat.id]} 
                        onChange={(v) => updateSetting(cat.id, v)} 
                      />
                    </div>
                    <Slider 
                      min={0} max={1} step={0.01}
                      value={settings[cat.vol]} 
                      onChange={(v) => updateSetting(cat.vol, v)} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Row: Actions */}
          <motion.div variants={itemVariants} style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button onClick={() => navigate('/')} variant="primary" icon={ArrowLeft} style={{ flex: 3, padding: '20px', fontSize: '1.1rem' }}>
                {t('backToMenu')}
              </Button>
              <Button 
                onClick={() => setIsConfirmOpen(true)} 
                variant="secondary" 
                icon={Trash2}
                style={{ flex: 1, opacity: 0.5, border: '1px dashed var(--glass-border)', fontSize: '0.85rem' }}
              >
                {t('clearStats')}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </GlassPanel>
    </div>
  );
}
