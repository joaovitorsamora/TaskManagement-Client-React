import { useMemo } from 'react';
import { useFilter } from '../../components/index';
import { useTasks } from '../context/useTasks';
import {
  FilterWrapper,
  Title,
  Subtitle,
  Group,
  Legend,
  TagList,
  TagButton,
} from './Filter.styles';
import { FilterGroup } from './FilterGroup';

export const Filter = () => {
  const { lista } = useTasks();

  const {
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
  } = useFilter();

  const priorityOptions = [
    { label: 'Todas', value: 'todas' },
    { label: 'Alta', value: 'alta' },
    { label: 'Média', value: 'media' },
    { label: 'Baixa', value: 'baixa' },
  ];

  const statusOptions = [
    { label: 'Aberta', value: 'aberta' },
    { label: 'Concluida', value: 'concluida' },
  ];

  const uniqueTags = useMemo(() => {
    return [...new Set(lista.flatMap((t) => t.tags))];
  }, [lista]);

  return (
    <FilterWrapper>
      <Title>Filtros</Title>

      <Subtitle>Refine sua lista de tarefas</Subtitle>

      <Group>
        <FilterGroup
          legend="Status"
          option={statusOptions}
          selected={selectedStatus}
          onChange={setSelectedStatus}
        />
      </Group>

      <Group>
        <FilterGroup
          legend="Prioridade"
          option={priorityOptions}
          selected={selectedPriority}
          onChange={setSelectedPriority}
        />
      </Group>

      <Group>
        <Legend>Tags</Legend>

        <TagList>
          {uniqueTags.map((tag) => (
            <TagButton key={tag}>{tag}</TagButton>
          ))}
        </TagList>
      </Group>
    </FilterWrapper>
  );
};
