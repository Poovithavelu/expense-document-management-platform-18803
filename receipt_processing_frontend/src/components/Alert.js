import React from 'react';

// PUBLIC_INTERFACE
export function Alert({ type = 'info', message }) {
  /** Simple alert banner for error/info states. */
  const colors = {
    info: '#0d6efd',
    success: '#198754',
    warning: '#ffc107',
    error: '#dc3545',
  };
  return (
    <div style={{
      border: `1px solid ${colors[type]}`,
      background: 'transparent',
      color: colors[type],
      padding: '10px 12px',
      borderRadius: 8,
      margin: '8px 0'
    }}>
      {message}
    </div>
  );
}
