import { createContext } from 'react';

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

interface TaskContextData {
  lista: TaskListProps[];
  setLista: React.Dispatch<React.SetStateAction<TaskListProps[]>>;
  loading: boolean;
  error: string;
  fetchTarefas: () => Promise<void>;
  pageCount: number;
  postPerPage: number;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);
