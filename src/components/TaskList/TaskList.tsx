import { useState } from 'react';
import {
  ListContainer,
  ListItem,
  Card,
  InfoArea,
  Tag,
  Priority,
} from './TaskList.styles';
import ReactPaginate from 'react-paginate';
import { useList, type Status, type TaskListProps } from '../../hooks/useList';
import { Modal } from './Modal';
import { useFilter } from '../../components/index';
import { useUser } from '../../hooks/useUsers';
import Swal from 'sweetalert2';

export type TaskUpdatePayload = {
  id?: number;
  statusTarefa: Status;
};

const TaskList = () => {
  const [showModal, setShowModal] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<TaskListProps>();
  const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem('authToken');
  const { setLista, error, loading, pageCount, postPerPage } = useList();
  const { selectedPriority, selectedStatus, searchItemValue } = useFilter();
  const { loggedUser } = useUser();

  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;

  if (!loggedUser) return null;

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

  const handleEditTask = async (id: number, payload: TaskListProps) => {
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
    const novoStatus: Status =
      tarefa.statusTarefa === 'Aberta' ? 'Concluida' : 'Aberta';

    setLista((prev) =>
      prev.map((item) =>
        item.id === tarefa.id ? { ...item, statusTarefa: novoStatus } : item
      )
    );

    try {
      if (!tarefa.statusTarefa) return;
      await handleEditTask(tarefa.id, { ...tarefa, statusTarefa: novoStatus });
    } catch (error) {
      alert(error);
    }
  };

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  const filteredTask = searchItemValue.filter((task: TaskListProps) => {
    const filterPriority =
      selectedPriority === 'Todas' || selectedPriority === ''
        ? true
        : task.prioridadeTarefa === selectedPriority;

    const filterStatus =
      selectedStatus === '' ||
      selectedStatus === 'Aberta' ||
      task.statusTarefa === selectedStatus;

    return filterStatus && filterPriority;
  });

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastPost = (currentPage + 1) * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = filteredTask.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <ListContainer>
        {currentPost.map((tarefa: TaskListProps) => (
          <ListItem key={tarefa.id}>
            <Card>
              <input
                type="checkbox"
                id={`tarefa-${tarefa.id}`}
                checked={tarefa.statusTarefa === 'Concluida'}
                onChange={() => handleChecked(tarefa)}
              />

              <label
                htmlFor={`tarefa-${tarefa.id}`}
                style={{
                  textDecoration:
                    tarefa.statusTarefa === 'Concluida'
                      ? 'line-through'
                      : 'none',
                }}
              >
                {tarefa.titulo}
              </label>

              <InfoArea>
                <Priority level={tarefa.prioridadeTarefa}>
                  {tarefa.prioridadeTarefa}
                </Priority>

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
                <button onClick={() => handleDeleteTask(tarefa.id)}>🗑️</button>
              </menu>
            </Card>
          </ListItem>
        ))}
      </ListContainer>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
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
