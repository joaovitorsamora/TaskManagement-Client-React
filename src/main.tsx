import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './styles/ThemeProvider.tsx';
import { FilterProvide } from './components/index.ts';
import { TaskProvider } from './components/context/TaskContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <FilterProvide>
        <TaskProvider>
          <App />
        </TaskProvider>
      </FilterProvide>
    </ThemeProvider>
  </StrictMode>
);
