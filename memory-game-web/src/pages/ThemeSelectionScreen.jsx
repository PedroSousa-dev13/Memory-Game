import { useNavigate } from 'react-router-dom';
import { PawPrint, Hash, ArrowLeft, Palette } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Button } from '../components/ui/Button';
import { useTranslation } from '../utils/translations';
import { useGameContext } from '../context/GameContext';
import { useArrowNavigation } from '../hooks/useArrowNavigation';

export function ThemeSelectionScreen() {
  const navigate = useNavigate();
  const { settings } = useGameContext();
  const { t } = useTranslation(settings.language);

  useArrowNavigation('.theme-container', settings.keyboardNavigation);

  const handleSelect = (theme) => {
    navigate('/difficulty', { state: { theme } });
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <GlassPanel className="theme-container" style={{ padding: '40px', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', position: 'relative' }}>
          <h1 className="glow-text" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Palette size={48} style={{ color: 'var(--primary)' }} />
            {t('selectTheme').toUpperCase()}
          </h1>
          <p className="subtitle">{t('selectTheme')}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', width: '100%' }}>
          <Button 
            onClick={() => handleSelect('baralho_animais')} 
            variant="primary" 
            icon={PawPrint}
            style={{ flex: 1, padding: '40px', flexDirection: 'column', gap: '15px' }}
          >
            {t('animals').toUpperCase()}
          </Button>
          <Button 
            onClick={() => handleSelect('baralho_numeros')} 
            variant="primary" 
            icon={Hash}
            style={{ flex: 1, padding: '40px', flexDirection: 'column', gap: '15px' }}
          >
            {t('numbers').toUpperCase()}
          </Button>
        </div>
        
        <Button onClick={() => navigate('/')} variant="secondary" icon={ArrowLeft} style={{ width: '100%' }}>
          {t('backToMenu')}
        </Button>
      </GlassPanel>
    </div>
  );
}
