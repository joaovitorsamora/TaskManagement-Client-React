import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useUser, type User } from '../../hooks/useUsers';

export type Status = 'aberta' | 'concluida';
export type Priority = 'todas' | 'alta' | 'media' | 'baixa';

export interface TaskListProps {
  id: number;
  usuarioId?: number;
  projetoId?: number;
  titulo: string;
  dataCriacao: string;
  prioridadeTarefa: Priority;
  tags: string[];
  statusTarefa: Status;
}

interface TokenPayload {
  nameid: string;
  email: string;
  exp: number;
}

interface TaskContextData {
  lista: TaskListProps[];
  setLista: React.Dispatch<React.SetStateAction<TaskListProps[]>>;
  loading: boolean;
  error: string;
  fetchTarefas: () => Promise<void>;
  pageCount: number;
  postPerPage: number;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { loggedUser } = useUser();
  const token = localStorage.getItem('authToken');
  const user = loggedUser as User;

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

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  return context;
};
