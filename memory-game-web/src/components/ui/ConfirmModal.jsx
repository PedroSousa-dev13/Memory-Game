import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Check } from 'lucide-react';
import { Button } from './Button';
import { GlassPanel } from './GlassPanel';
import { useTranslation } from '../../utils/translations';
import { useGameContext } from '../../context/GameContext';

export function ConfirmModal({ isOpen, onConfirm, onCancel, title, description }) {
  const { settings } = useGameContext();
  const { t } = useTranslation(settings.language);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="modal-overlay"
          style={{ zIndex: 3000 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <GlassPanel className="modal-content" style={{ width: '400px', textAlign: 'center', border: '1px solid var(--accent)' }}>
              <div style={{ marginBottom: '20px', display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(255, 71, 87, 0.1)' }}>
                <AlertTriangle size={40} style={{ color: 'var(--accent)' }} />
              </div>

              <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '10px' }}>{title || t('confirmExit')}</h2>
              <p className="subtitle" style={{ marginBottom: '30px', fontSize: '0.95rem' }}>{description || t('confirmExitDesc')}</p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" onClick={onCancel} style={{ flex: 1 }}>
                  {t('stay')}
                </Button>
                <Button variant="primary" onClick={onConfirm} style={{ flex: 1, backgroundColor: 'var(--accent)' }}>
                  {t('leave')}
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
