import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { TaskContext, type TaskListProps } from './TaskContext';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  nameid: string;
  email: string;
  exp: number;
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('authToken');

  const [lista, setLista] = useState<TaskListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;
  const postPerPage = 3;
  const [pageCount, setPageCount] = useState(0);

  const fetchTarefas = useCallback(async () => {
    if (!token || !tarefasApi) return;

    try {
      setLoading(true);
      setError('');

      const decoded = jwtDecode<TokenPayload>(token);
      const idFromToken = Number(decoded.nameid);

      const response = await fetch(tarefasApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Falha ao carregar tarefas.');

      const data: TaskListProps[] = await response.json();

      const tarefasDoUsuario = data.filter((t) => t.usuarioId === idFromToken);

      setLista(tarefasDoUsuario);
      setPageCount(Math.ceil(tarefasDoUsuario.length / postPerPage));
    } catch (err) {
      setError((err as Error).message);
      console.error('Erro fetchTarefas:', err);
    } finally {
      setLoading(false);
    }
  }, [token, tarefasApi]);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]);

  return (
    <TaskContext.Provider
      value={{
        lista,
        setLista,
        loading,
        error,
        fetchTarefas,
        pageCount,
        postPerPage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
