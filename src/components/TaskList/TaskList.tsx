import { useState } from 'react';
import {
  ListContainer,
  ListItem,
  Card,
  InfoArea,
  Tag,
  PriorityStyle,
  ReactPaginateStyle,
} from './TaskList.styles';
import { Modal } from './Modal';
import { useFilter } from '../../components/index';
import { useUser } from '../../hooks/useUsers';
import Swal from 'sweetalert2';
import { useTasks } from '../context/useTasks';
import type { Status, TaskListProps } from '../context/TaskContext';

export type TaskUpdatePayload = {
  id?: number;
  statusTarefa: Status;
};

const TaskList = () => {
  const [showModal, setShowModal] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<TaskListProps>();
  const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem('authToken');
  const { searchItemValue } = useFilter();
  const { setLista, postPerPage } = useTasks();
  const { loggedUser } = useUser();

  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;

  if (!loggedUser) return null;

  const StatusMap: Record<string, Status> = {
    aberta: 'aberta',
    concluida: 'concluida',
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return alert('Token inválido!');
    if (!confirm('Tem certeza que deseja excluir essa tarefa?')) return;

    try {
      const response = await fetch(`${tarefasApi}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao deletar tarefa');

      setLista((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      alert('Erro ao excluir tarefa');
    }
  };

  const handleEditTask = async (
    id: number,
    payload: Partial<TaskListProps>
  ) => {
    if (!token) {
      Swal.fire({
        title: 'Erro!',
        text: 'Token inválido! Faça login novamente.',
        icon: 'error',
      });
      return;
    }

    try {
      const { id: _, ...dadosAtualizados } = payload;

      console.log('🔍 URL:', `${tarefasApi}/${id}`);
      console.log('📦 Dados:', dadosAtualizados);
      console.log('Token', token);
      const response = await fetch(`${tarefasApi}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
      });

      console.log('📊 Status:', response.status);
      console.log('✅ OK:', response.ok);

      if (response.status === 204) {
        console.log('✅ Tarefa atualizada com sucesso (204 No Content)');

        setLista((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, ...dadosAtualizados } : item
          )
        );

        Swal.fire({
          title: 'Sucesso!',
          text: 'Tarefa atualizada com sucesso!',
          icon: 'success',
        });
        return;
      }

      const responseData = await response.json();
      console.log('📋 Resposta do servidor:', responseData);

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            responseData.error ||
            `HTTP ${response.status}`
        );
      }

      setLista((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...dadosAtualizados } : item
        )
      );

      Swal.fire({
        title: 'Sucesso!',
        text: 'Tarefa atualizada com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.error('❌ Erro completo:', error);

      const mensagem =
        error instanceof Error
          ? error.message
          : 'Erro na comunicação com servidor';

      Swal.fire({
        title: 'Erro ao atualizar!',
        text: mensagem,
        icon: 'error',
        footer: 'Verifique a conexão com o servidor',
      });
    }
  };

  const handleChecked = async (tarefa: TaskListProps) => {
    const statusOriginal = tarefa.statusTarefa;
    const novoStatus: Status =
      StatusMap[tarefa.statusTarefa] === 'aberta' ? 'concluida' : 'aberta';

    setLista((prev) =>
      prev.map((item) =>
        item.id === tarefa.id ? { ...item, statusTarefa: novoStatus } : item
      )
    );

    try {
      await handleEditTask(tarefa.id, { statusTarefa: novoStatus });
    } catch (error) {
      setLista((prev) =>
        prev.map((item) =>
          item.id === tarefa.id
            ? { ...item, statusTarefa: statusOriginal }
            : item
        )
      );
    }
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastPost = (currentPage + 1) * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchItemValue.slice(indexOfFirstPost, indexOfLastPost);
  const getPrioridade = (prioridade: unknown) => {
    const safe =
      typeof prioridade === 'string'
        ? prioridade
        : String(prioridade ?? 'todas');

    const label =
      safe.length > 0 ? safe.charAt(0).toUpperCase() + safe.slice(1) : 'Todas';

    return {
      raw: safe,
      label,
    };
  };

  return (
    <>
      <ListContainer>
        {currentPost.map((tarefa: TaskListProps) => {
          const prioridade = getPrioridade(tarefa.prioridadeTarefa);
          return (
            <ListItem key={tarefa.id}>
              <Card>
                <input
                  type="checkbox"
                  id={`tarefa-${tarefa.id}`}
                  checked={tarefa.statusTarefa === 'concluida'}
                  onChange={() => handleChecked(tarefa)}
                />

                <label
                  htmlFor={`tarefa-${tarefa.id}`}
                  style={{
                    textDecoration:
                      tarefa.statusTarefa === 'concluida'
                        ? 'line-through'
                        : 'none',
                  }}
                >
                  {tarefa.titulo}
                </label>

                <InfoArea>
                  <PriorityStyle level={prioridade.label}>
                    {prioridade.label}
                  </PriorityStyle>

                  <time dateTime={tarefa.dataCriacao}>
                    {new Date(tarefa.dataCriacao).toLocaleDateString()}
                  </time>

                  {tarefa.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {tarefa.tags.map((tag, i) => (
                        <Tag key={i}>{tag}</Tag>
                      ))}
                    </div>
                  )}
                </InfoArea>

                <menu
                  style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}
                >
                  <button
                    onClick={() => {
                      setTarefaSelecionada(tarefa);
                      setShowModal(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => handleDeleteTask(tarefa.id)}>
                    🗑️
                  </button>
                </menu>
              </Card>
            </ListItem>
          );
        })}
      </ListContainer>
      <ReactPaginateStyle
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(searchItemValue.length / postPerPage)}
        forcePage={currentPage}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'previousNextButton'}
        nextClassName={'previousNextButton'}
        pageLinkClassName={'page-link'}
      />

      {showModal && tarefaSelecionada && (
        <Modal
          showModal={showModal}
          tarefaSelecionada={tarefaSelecionada}
          handleEditTask={handleEditTask}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default TaskList;
