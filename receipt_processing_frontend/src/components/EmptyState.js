import React from 'react';

// PUBLIC_INTERFACE
export function EmptyState({ title = 'Nothing here yet', description }) {
  /** Empty state component. */
  return (
    <div style={{ padding: 24, border: '1px dashed var(--border-color)', borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 4px' }}>{title}</h3>
      {description && <p style={{ margin: 0, opacity: 0.8 }}>{description}</p>}
    </div>
  );
}
