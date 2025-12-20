import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUsers';
import { TaskForm } from './TaskForm';
import { TaskHeader } from './TaskHeader';
import { TaskWrapper } from './Task.styles';

const Task = () => {
  const { loggedUser } = useUser();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (
      window.location.pathname.includes('/tasks') &&
      (!authToken || !loggedUser)
    ) {
      Swal.fire({
        text: 'Você precisa fazer login para criar tarefas.',
        icon: 'warning',
        confirmButtonText: 'Fazer Login',
      })
        .then((result) => {
          if (result.isConfirmed) {
            document.dispatchEvent(new CustomEvent('openLoginModal'));
          }
        })
        .catch((error) => {
          console.error('Erro ao abrir modal de login:', error);
        });
    }
  }, [authToken, loggedUser]);

  if (!authToken || !loggedUser) {
    return null;
  }

  try {
    return (
      <TaskWrapper>
        <TaskHeader />
        <TaskForm />
      </TaskWrapper>
    );
  } catch (error) {
    console.error('Erro ao renderizar tarefa:', error);
  }
};

export default Task;
