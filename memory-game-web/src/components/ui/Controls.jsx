import React from 'react';
import { motion } from 'framer-motion';

export function Switch({ checked, onChange, label, description, addon }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '12px 0'
    }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>{label}</div>
        {description && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>{description}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {addon}
        <div 
          onClick={() => onChange(!checked)}
          style={{
            width: '50px',
            height: '24px',
            backgroundColor: checked ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.4s ease',
            boxShadow: checked ? '0 0 15px var(--primary-glow)' : 'none'
          }}
        >
          <motion.div 
            animate={{ x: checked ? 26 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: 0,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Slider({ value, min, max, step = 0.1, onChange, label, description }) {
  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '1rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
          <span>{label}</span>
          <span style={{ color: 'var(--primary)', fontFamily: "'Outfit', sans-serif" }}>
            {typeof value === 'number' ? value.toFixed(2) : value}
          </span>
        </div>
        {description && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>{description}</div>}
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))} 
          style={{ 
            width: '100%', 
            cursor: 'pointer', 
            accentColor: 'var(--primary)',
            height: '6px',
            borderRadius: '3px',
            appearance: 'none',
            background: 'rgba(255,255,255,0.1)'
          }}
        />
      </div>
    </div>
  );
}
