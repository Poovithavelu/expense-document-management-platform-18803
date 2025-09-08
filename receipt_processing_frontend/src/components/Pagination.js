import React from 'react';

// PUBLIC_INTERFACE
export function Pagination({ page, pageSize, total, onPageChange }) {
  /** Simple pagination control. */
  const totalPages = Math.max(1, Math.ceil((total || 0) / (pageSize || 10)));
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
      <span>Page {page} / {totalPages}</span>
      <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
