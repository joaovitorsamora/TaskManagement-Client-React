import { ThemeProvider as StyledTheme } from 'styled-components';
import { useState, useEffect, type ReactNode } from 'react';
import { lightTheme, darkTheme, type AppTheme } from './theme';
import { GlobalStyles } from './global';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AppTheme>(lightTheme);

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved === 'dark') setTheme(darkTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme.name === 'light' ? darkTheme : lightTheme;
    setTheme(next);
    localStorage.setItem('theme-mode', next.name);
  };

  return (
    <StyledTheme theme={theme}>
      <GlobalStyles />
      {/* expondo para qualquer componente */}
      <div data-theme={theme.name}>{children}</div>
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: theme.colors.primary,
          color: '#fff',
          border: 'none',
          padding: '12px 16px',
          borderRadius: theme.radius.md,
          boxShadow: theme.shadow.md,
          cursor: 'pointer',
          transition: theme.transition,
        }}
      >
        {theme.name === 'light' ? '🌙' : '☀️'}
      </button>
    </StyledTheme>
  );
};
