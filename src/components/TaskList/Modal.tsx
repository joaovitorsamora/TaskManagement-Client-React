import React, { useEffect, useState } from 'react';

import {
  Overlay,
  ModalContainer,
  SaveButton,
  CancelButton,
} from './Modal.styles';
import type { Priority, TaskListProps } from '../context/TaskContext';

interface ModalProps {
  showModal: boolean;
  tarefaSelecionada: TaskListProps;
  handleEditTask: (id: number, payload: TaskListProps) => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({
  showModal,
  setShowModal,
  tarefaSelecionada,
  handleEditTask,
}: ModalProps) => {
  const PriorityMap: Record<string, Priority> = {
    todas: 'todas',
    alta: 'alta',
    media: 'media',
    baixa: 'baixa',
  };

  const [editedTask, setEditedTask] =
    useState<TaskListProps>(tarefaSelecionada);

  useEffect(() => {
    setEditedTask(tarefaSelecionada);
  }, [tarefaSelecionada]);

  if (!showModal) return null;

  return (
    <Overlay>
      <ModalContainer
        onSubmit={(e) => {
          e.preventDefault();
          if (editedTask.id !== undefined) {
            handleEditTask(editedTask.id, editedTask);
            setShowModal(false);
          }
        }}
      >
        <input
          type="text"
          placeholder="Título"
          value={editedTask.titulo || ''}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              titulo: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Data de criação"
          value={editedTask.dataCriacao || ''}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              dataCriacao: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Prioridade"
          value={editedTask.prioridadeTarefa || ''}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              prioridadeTarefa: PriorityMap[e.target.value],
            })
          }
        />

        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={editedTask.tags?.join(', ') || ''}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            })
          }
        />

        <SaveButton type="submit">Salvar</SaveButton>
        <CancelButton type="button" onClick={() => setShowModal(false)}>
          Cancelar
        </CancelButton>
      </ModalContainer>
    </Overlay>
  );
};
