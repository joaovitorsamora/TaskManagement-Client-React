import { useState } from 'react';
import {
  FormContainer,
  FieldGroup,
  Grid,
  ButtonRow,
  SubmitButton,
  ResetButton,
} from './TaskForm.styles';
import { useUser } from '../../hooks/useUsers';
import type { Priority, Status } from '../context/TaskContext';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskFormProps {
  id?: number;
  usuarioId?: number;
  projetoId?: number;
  titulo: string;
  projetoNome: string;
  statusTarefa?: Status;
  prioridadeTarefa: Priority;
  tags: string[];
}

export const TaskForm = () => {
  const [tarefa, setTarefa] = useState<TaskFormProps>({
    titulo: '',
    statusTarefa: 'aberta',
    prioridadeTarefa: 'todas',
    projetoNome: '',
    tags: [''],
  });
  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;
  const authToken = localStorage.getItem('authToken');
  const prioridadeMap: Record<string, Priority> = {
    todas: 'todas',
    alta: 'alta',
    media: 'media',
    baixa: 'baixa',
  };

  const { loggedUser } = useUser();

  if (!loggedUser) {
    return null;
  }
  const handleTarefaCreate = async () => {
    try {
      const response = await fetch(tarefasApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          Titulo: tarefa.titulo,
          ProjetoNome: tarefa.projetoNome,
          StatusTarefa: tarefa.statusTarefa,
          PrioridadeTarefa:
            prioridadeMap[tarefa.prioridadeTarefa.toLowerCase()] ?? 'media',
          Tags: tarefa.tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro criando tarefa:', data);
        alert(data?.message ?? 'Erro ao criar tarefa');
        return;
      }

      setTarefa({
        titulo: '',
        projetoNome: '',
        prioridadeTarefa: 'media',
        tags: [''],
      });

      setTarefa(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar tarefa');
    }
  };

  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        handleTarefaCreate();
      }}
    >
      <h2>Nova Tarefa</h2>

      <FieldGroup>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={tarefa.titulo}
          onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
          placeholder="Ex.: Enviar relatório"
        />
      </FieldGroup>

      <Grid>
        <FieldGroup>
          <label htmlFor="prioridade">Prioridade</label>
          <select
            id="prioridade"
            value={tarefa.prioridadeTarefa}
            onChange={(e) =>
              setTarefa({
                ...tarefa,
                prioridadeTarefa: prioridadeMap[e.target.value],
              })
            }
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </FieldGroup>

        <FieldGroup>
          <label htmlFor="projeto">Projeto</label>
          <input
            id="projeto"
            type="text"
            value={tarefa.projetoNome}
            onChange={(e) =>
              setTarefa({ ...tarefa, projetoNome: e.target.value })
            }
            placeholder="Nome do Projeto"
          />
        </FieldGroup>
      </Grid>

      <FieldGroup>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tarefa.tags.join(',')}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              tags: e.target.value.split(',').map((t) => t.trim()),
            })
          }
          placeholder="Separe por vírgula"
        />
      </FieldGroup>

      <ButtonRow>
        <SubmitButton type="submit">Adicionar</SubmitButton>
        <ResetButton type="reset">Limpar</ResetButton>
      </ButtonRow>
    </FormContainer>
  );
};
