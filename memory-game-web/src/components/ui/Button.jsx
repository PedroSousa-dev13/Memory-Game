import React from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../../context/GameContext';
import { useSoundManager } from '../../hooks/useSoundManager';

export function Button({ children, variant = 'primary', className = '', icon: Icon, onClick, ...props }) {
  const { settings } = useGameContext();
  const { playClick } = useSoundManager(settings);

  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`btn ${variant} ${className}`} 
      onClick={handleClick}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
}
