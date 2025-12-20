export const lightTheme = {
  name: 'light',
  colors: {
    background: '#f8f9fa',
    surface: '#ffffff',
    surface2: '#f1f3f5',
    text: '#1e1e1e',
    textSecondary: '#5a5a5a',
    border: '#e3e3e3',

    // Tons de cor — suaves, mas coloridos
    primary: '#6c5ce7', // roxo moderno
    secondary: '#00b894', // verde soft
    accent: '#fdcb6e', // amarelo moderado
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '18px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },
  transition: '0.25s ease',
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#0f1115',
    surface: '#16181d',
    surface2: '#1e2026',
    text: '#f2f2f7',
    textSecondary: '#a0a0a0',
    border: '#26282f',

    // Mesmas cores, mas ajustadas pra não estourar no dark
    primary: '#a29bfe',
    secondary: '#55efc4',
    accent: '#ffeaa7',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '18px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.35)',
    md: '0 4px 12px rgba(0,0,0,0.45)',
    lg: '0 8px 24px rgba(0,0,0,0.55)',
  },
  transition: '0.25s ease',
};

export type AppTheme = typeof lightTheme;
