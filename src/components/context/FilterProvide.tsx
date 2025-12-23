import { useMemo, useState, type ReactNode } from 'react';
import { FilterContext } from './FilterContext';
import { useTasks } from './TaskContext';

export const FilterProvide = ({ children }: { children: ReactNode }) => {
  const { lista } = useTasks();
  const [selectedPriority, setSelectedPriority] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('');

  const searchItemValue = useMemo(() => {
    if (!lista) return [];

    return lista.filter((task) => {
      const filterPriority =
        selectedPriority === 'todas' ||
        selectedPriority === '' ||
        task.prioridadeTarefa === selectedPriority;

      const filterStatus =
        selectedStatus === '' || task.statusTarefa === selectedStatus;

      return filterPriority && filterStatus;
    });
  }, [lista, selectedPriority, selectedStatus]);

  return (
    <FilterContext.Provider
      value={{
        selectedPriority,
        setSelectedPriority,
        selectedStatus,
        setSelectedStatus,
        searchItemValue,
        setSearchItemValue: () => {},
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
