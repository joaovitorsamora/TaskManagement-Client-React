import { TaskForm } from './TaskForm';
import { TaskHeader } from './TaskHeader';
import { TaskWrapper } from './Task.styles';
import { useAuth } from '../context/useAuth';



const Task = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <TaskWrapper>
      <TaskHeader />
      <TaskForm />
    </TaskWrapper>
  );
};

export default Task;
