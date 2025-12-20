import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useUser, type User } from './useUsers';

export type Status = 'Aberta' | 'Concluida';
export type Priority = 'Todas' | 'Alta' | 'Media' | 'Baixa';

interface TokenPayload {
  nameid: string; // O ID do usuário vindo do ASP.NET costuma vir aqui
  email: string;
  exp: number;
}

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

export const useList = () => {
  const { loggedUser } = useUser();
  const token = localStorage.getItem('authToken');
  const user = loggedUser as User;

  const [lista, setLista] = useState<TaskListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS || '';
  const postPerPage = 3;
  const [pageCount, setPageCount] = useState(0);

  const fetchTarefas = useCallback(async () => {
    // Se não tiver token ou a URL da API estiver vazia, não tenta o fetch
    if (!token || !tarefasApi) return;

    try {
      setLoading(true);
      setError('');

      // Decodifica o token para pegar o ID do usuário logado
      const decoded = jwtDecode<TokenPayload>(token);
      const idFromToken = Number(decoded.nameid);
      setUserId(idFromToken);

      const response = await fetch(tarefasApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Falha ao carregar tarefas.');

      const data: TaskListProps[] = await response.json();

      // Filtra as tarefas para mostrar apenas as do usuário atual
      const tarefasDoUsuario = data.filter((t) => t.usuarioId === idFromToken);

      setLista(tarefasDoUsuario);
      setPageCount(Math.ceil(tarefasDoUsuario.length / postPerPage));

      if (user?.id) {
        setIsOwner(user.id === idFromToken);
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Erro fetchTarefas:', err);
    } finally {
      setLoading(false);
    }
  }, [token, tarefasApi, user?.id]);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]);

  return {
    lista,
    setLista,
    loading,
    error,
    isOwner,
    userId,
    pageCount,
    postPerPage,
    fetchTarefas,
  };
};
