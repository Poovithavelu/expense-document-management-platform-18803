import React from 'react';

// PUBLIC_INTERFACE
export function Container({ children, maxWidth = 1200 }) {
  /** Page container for consistent spacing and max width. */
  return (
    <main style={{ margin: '0 auto', padding: '20px', maxWidth }}>
      {children}
    </main>
  );
}
