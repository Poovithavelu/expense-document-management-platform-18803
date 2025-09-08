import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import { Container } from './components/Container';
import UploadPage from './pages/UploadPage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import SearchPage from './pages/SearchPage';
import VersionsPage from './pages/VersionsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const THEME_KEY = 'app_theme';

// PUBLIC_INTERFACE
function App() {
  /** Root app with theme toggle, navigation, and route mapping. */
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar theme={theme} onToggleTheme={toggleTheme} />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/documents" replace />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:id" element={<DocumentDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/documents/:id/versions" element={<VersionsPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
