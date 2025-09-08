import React from 'react';

// PUBLIC_INTERFACE
export function Loader({ label = 'Loading...' }) {
  /** Generic loader indicator. */
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8 }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        border: '2px solid var(--border-color)',
        borderTopColor: 'var(--text-secondary)',
        animation: 'spin 1s linear infinite'
      }} />
      <span>{label}</span>
      <style>{`@keyframes spin { from { transform: rotate(0)} to {transform: rotate(360deg)}}`}</style>
    </div>
  );
}
