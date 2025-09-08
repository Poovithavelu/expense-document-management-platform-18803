import React from 'react';
import { Alert } from './Alert';

// PUBLIC_INTERFACE
export function ErrorState({ error, onRetry }) {
  /** Displays an error message with optional retry. */
  return (
    <div>
      <Alert type="error" message={error?.message || 'An unexpected error occurred.'} />
      {onRetry && (
        <button onClick={onRetry} style={btnStyle}>Retry</button>
      )}
    </div>
  );
}

const btnStyle = {
  background: 'var(--button-bg)',
  color: 'var(--button-text)',
  border: 'none',
  borderRadius: 8,
  padding: '8px 12px',
  cursor: 'pointer',
  marginTop: 8
};
