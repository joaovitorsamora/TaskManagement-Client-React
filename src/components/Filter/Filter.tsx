import { useList } from '../../hooks/useList';
import { useFilter } from '../../components/index';

import {
  FilterWrapper,
  Title,
  Subtitle,
  Group,
  Legend,
  CheckGroup,
  Option,
  TagList,
  TagButton,
} from './Filter.styles';

export const Filter = () => {
  const { lista } = useList();

  const {
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
  } = useFilter();

  const priorities = ['Todas', 'Alta', 'Media', 'Baixa'];

  const status = [{ Aberta: 'Aberta', Concluida: 'Concluida' }];

  return (
    <FilterWrapper>
      <Title>Filtros</Title>

      <Subtitle>Refine sua lista de tarefas</Subtitle>

      <Group>
        <Legend>Status</Legend>

        {status.map((s, idx) => (
          <CheckGroup key={idx}>
            <Option>
              <input
                type="checkbox"
                value={s.Aberta}
                checked={selectedStatus === s.Aberta}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              {s.Aberta}
            </Option>

            <Option>
              <input
                type="checkbox"
                value={s.Concluida}
                checked={selectedStatus === s.Concluida}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              {s.Concluida}
            </Option>
          </CheckGroup>
        ))}
      </Group>

      <Group>
        <Legend>Prioridade</Legend>

        {priorities.map((priority) => (
          <Option key={priority}>
            <input
              type="radio"
              name="prioridade"
              value={priority}
              checked={selectedPriority === priority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            />
            {priority}
          </Option>
        ))}
      </Group>

      <Group>
        <Legend>Tags</Legend>

        <TagList>
          {lista.map((tarefa) =>
            tarefa.tags.map((tag, idx) => (
              <TagButton key={idx}>{tag}</TagButton>
            ))
          )}
        </TagList>
      </Group>
    </FilterWrapper>
  );
};
