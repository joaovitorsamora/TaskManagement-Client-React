import { useUser } from '../../hooks/useUsers';
import { TaskForm } from './TaskForm';
import { TaskHeader } from './TaskHeader';
import { TaskWrapper } from './Task.styles';

const Task = () => {
  const { user } = useUser();

  const users = user!!;

  if (!users) return null;

  return (
    <TaskWrapper>
      <TaskHeader />
      <TaskForm />
    </TaskWrapper>
  );
};

export default Task;
