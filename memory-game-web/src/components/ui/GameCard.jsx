import React from 'react';
import { motion } from 'framer-motion';

export const GameCard = React.memo(function GameCard({ 
  card, 
  index, 
  isFocused, 
  isShaking, 
  isMatchedAnim, 
  theme, 
  onClick, 
  t 
}) {
  return (
    <motion.div 
      role="button"
      tabIndex={-1}
      aria-label={`${t('card')} ${index + 1}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: card.isMatched ? 0.95 : (isFocused ? 1.05 : 1), 
        rotateY: card.isFlipped || card.isMatched ? 180 : 0,
        boxShadow: isFocused ? '0 0 20px 4px var(--primary)' : '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.01 }}
      className={`card ${card.isMatched ? 'matched' : ''} ${isShaking ? 'shake' : ''} ${isMatchedAnim ? 'matched-animation' : ''} ${isFocused ? 'keyboard-focused' : ''}`}
      onClick={onClick}
    >
      <div className="card-face card-back"></div>
      <div className="card-face card-front">
        <img 
          src={`/Items_Jogo/${theme}/${card.image}`} 
          alt={card.image.split('.')[0]} 
          style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: '16px' }} 
        />
      </div>
    </motion.div>
  );
});
