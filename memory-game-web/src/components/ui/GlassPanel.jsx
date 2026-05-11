import React from 'react';
import { motion } from 'framer-motion';

export function GlassPanel({ children, className = '', animate = true, ...props }) {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  } : {};

  return (
    <Component className={`glass-panel ${className}`} {...animationProps} {...props}>
      {children}
    </Component>
  );
}
