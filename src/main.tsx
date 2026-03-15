import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './styles/ThemeProvider.tsx';
import { FilterProvide } from './components/index.ts';
import { TaskProvider } from './components/context/TaskProvider.tsx';
import { AuthProvider } from './components/context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <FilterProvide>
        <TaskProvider>
          <App />
        </TaskProvider>
      </FilterProvide>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
