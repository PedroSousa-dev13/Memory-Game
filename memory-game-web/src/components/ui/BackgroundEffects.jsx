import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects = React.memo(function BackgroundEffects() {
  const orbs = useMemo(() => [
    { color: 'var(--primary)', size: '600px', duration: 25, delay: 0, x: ['-10%', '20%', '-10%'], y: ['-10%', '10%', '-10%'] },
    { color: 'var(--accent)', size: '700px', duration: 30, delay: 2, x: ['110%', '80%', '110%'], y: ['110%', '90%', '110%'] },
    { color: 'hsl(180, 100%, 50%)', size: '500px', duration: 20, delay: 5, x: ['80%', '20%', '80%'], y: ['-10%', '40%', '-10%'] },
    { color: 'hsl(280, 100%, 70%)', size: '400px', duration: 35, delay: 8, x: ['-10%', '50%', '-10%'], y: ['110%', '60%', '110%'] },
  ], []);

  const particles = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    opacity: Math.random() * 0.2,
    scale: Math.random() * 0.5 + 0.5,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 30 + 30,
    isPrimary: i % 2 === 0
  })), []);

  return (
    <div className="premium-bg">
      {/* Mesh Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="mesh-orb"
          animate={{ 
            x: orb.x,
            y: orb.y,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: orb.duration, 
            repeat: Infinity, 
            delay: orb.delay,
            ease: "easeInOut"
          }}
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: 0,
            left: 0,
            zIndex: -2,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={`part-${p.id}`}
          initial={{ 
            opacity: p.opacity,
            scale: p.scale,
            x: p.startX + "vw", 
            y: p.startY + "vh" 
          }}
          animate={{ 
            x: [null, p.endX + "vw"],
            y: [null, p.endY + "vh"]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            position: 'fixed',
            width: p.size + 'px',
            height: p.size + 'px',
            borderRadius: '50%',
            background: p.isPrimary ? 'var(--primary)' : 'var(--accent)',
            filter: 'blur(1px)',
            boxShadow: `0 0 8px ${p.isPrimary ? 'var(--primary)' : 'var(--accent)'}`,
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
});
