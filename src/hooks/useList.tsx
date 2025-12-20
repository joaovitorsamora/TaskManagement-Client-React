import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useUser, type User } from './useUsers';

export type Status = 'Aberta' | 'Concluida';
export type Priority = 'Todas' | 'Alta' | 'Media' | 'Baixa';

interface TokenPayload {
  nameid: string;
  unique_name: string;
  email: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: number;
  aud: number;
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

  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;
  const [pageCount, setPageCount] = useState(0);
  const postPerPage = 3;

  const fetchTarefas = useCallback(async () => {
    if (!user?.id || !token) return;

    try {
      setLoading(true);
      setError('');

      const decoded = jwtDecode<TokenPayload>(token);
      const id = Number(decoded.nameid);
      setUserId(id);
      setIsOwner(user.id === id);

      const response = await fetch(tarefasApi, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao buscar tarefas');

      const data: TaskListProps[] = await response.json();
      const tarefasDoUsuario = data.filter((t) => t.usuarioId === id);

      setLista(tarefasDoUsuario);
      setPageCount(Math.ceil(tarefasDoUsuario.length / postPerPage));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, token, tarefasApi]);

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
