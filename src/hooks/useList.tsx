import { useEffect, useState } from 'react';
import { useUser } from './useUsers';
import { jwtDecode } from 'jwt-decode';
type User = {
  id: number;
  nome: string;
  email: string;
  senha?: string;
};

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
  const [userId, setUserId] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;
  const [pageCount, setPageCount] = useState(0);
  const [postPerPage] = useState(3);

  useEffect(() => {
    const fetchTarefas = async () => {
      if (!user?.id) return;
      try {
        if (!token) throw new Error('Token não encontrado!');
        const decodedPayload = jwtDecode<TokenPayload>(token);
        const id = Number(decodedPayload.nameid);
        setUserId(id);
        setIsOwner(user?.id === id);

        setLoading(true);
        setError('');

        const response = await fetch(tarefasApi, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Erro ao buscar tarefas');

        const data: TaskListProps[] = await response.json();
        const tarefasDoUsuario = data.filter(
          (tarefa) => tarefa.usuarioId === id
        );

        setLista(tarefasDoUsuario);
        setPageCount(Math.ceil(tarefasDoUsuario.length / postPerPage));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, [tarefasApi, user?.id, postPerPage, token]);

  return {
    lista,
    setLista,
    loading,
    error,
    isOwner,
    userId,
    pageCount,
    postPerPage,
    tarefasApi,
  };
};
