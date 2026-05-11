import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, HelpCircle, Layout, Accessibility, ArrowLeft } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { useTranslation } from '../utils/translations';
import { useGameContext } from '../context/GameContext';

export function RulesScreen() {
  const navigate = useNavigate();
  const { settings } = useGameContext();
  const { t } = useTranslation(settings.language);
  const [activeTab, setActiveTab] = useState('howToPlay');

  const tabs = [
    { id: 'howToPlay', label: t('howToPlay'), icon: HelpCircle },
    { id: 'structure', label: t('structure'), icon: Layout },
    { id: 'adaptations', label: t('accessibility'), icon: Accessibility }
  ];

  const content = t('ruleLines');

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <GlassPanel style={{ 
        padding: '40px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px', 
        width: '100%', 
        maxWidth: '800px', 
        height: '80vh' 
      }}>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <h1 className="glow-text" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <BookOpen size={48} style={{ color: 'var(--primary)' }} />
            {t('rulesTitle')}
          </h1>
          <p className="subtitle">{t('playerGuide')}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {tabs.map(tab => (
            <Button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              icon={tab.icon}
              style={{ flex: 1, fontSize: '0.9rem' }}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '30px', 
          backgroundColor: 'rgba(255,255,255,0.03)', 
          borderRadius: '24px',
          border: '1px solid var(--glass-border)'
        }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {content[activeTab].map((text, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  gap: '15px', 
                  alignItems: 'flex-start',
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  color: 'var(--text-main)'
                }}>
                  <div style={{ 
                    marginTop: '8px',
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--primary)',
                    boxShadow: '0 0 10px var(--primary-glow)',
                    flexShrink: 0
                  }} />
                  {text}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <Button onClick={() => navigate('/')} variant="secondary" icon={ArrowLeft} style={{ width: '100%' }}>
          {t('backToMenu')}
        </Button>
      </GlassPanel>
    </div>
  );
}
