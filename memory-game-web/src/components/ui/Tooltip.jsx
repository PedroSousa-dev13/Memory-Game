import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Tooltip({ children, content }) {
  const [show, setShow] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '0.8rem',
              width: '280px',
              zIndex: 1000,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              pointerEvents: 'none',
              textAlign: 'left',
              lineHeight: '1.4'
            }}
          >
            {content}
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(0, 0, 0, 0.9)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
