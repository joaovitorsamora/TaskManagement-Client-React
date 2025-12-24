import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUsers';
import { TaskForm } from './TaskForm';
import { TaskHeader } from './TaskHeader';
import { TaskWrapper } from './Task.styles';

const Task = () => {
  const { loggedUser, loading } = useUser();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (loading) return;
    const isAuthenticated = !!authToken && !!loggedUser;
    if (!isAuthenticated) {
      Swal.fire({
        text: 'Você precisa fazer login para criar tarefas.',
        icon: 'warning',
        confirmButtonText: 'Fazer Login',
      }).then((result) => {
        if (result.isConfirmed) {
          document.dispatchEvent(new CustomEvent('openLoginModal'));
        }
      });
    }
  }, [authToken, loggedUser, loading]);

  if (!loggedUser) return null;

  return (
    <TaskWrapper>
      <TaskHeader />
      <TaskForm />
    </TaskWrapper>
  );
};

export default Task;
