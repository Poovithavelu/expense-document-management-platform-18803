import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export function NavBar({ theme, onToggleTheme }) {
  /** Top navigation bar with primary routes and theme switch. */
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar" style={styles.navbar}>
      <div style={styles.brand}>Expense Docs</div>
      <div style={styles.links}>
        <Link to="/documents" style={{ ...styles.link, ...(isActive('/documents') ? styles.active : {}) }}>Documents</Link>
        <Link to="/upload" style={{ ...styles.link, ...(isActive('/upload') ? styles.active : {}) }}>Upload</Link>
        <Link to="/search" style={{ ...styles.link, ...(isActive('/search') ? styles.active : {}) }}>Search</Link>
        <Link to="/admin" style={{ ...styles.link, ...(isActive('/admin') ? styles.active : {}) }}>Admin</Link>
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  brand: {
    fontWeight: 700,
    fontSize: 18,
  },
  links: {
    display: 'flex',
    gap: 12,
    marginLeft: 16,
  },
  link: {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: 6,
    border: '1px solid transparent',
  },
  active: {
    borderColor: 'var(--border-color)',
    background: 'var(--bg-primary)',
  },
};
