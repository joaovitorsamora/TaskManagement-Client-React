import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { TaskListProps } from './TaskContext';

interface FilterContextProps {
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchItemValue: TaskListProps[];
  setSearchItemValue: Dispatch<SetStateAction<TaskListProps[]>>;
}

export const FilterContext = createContext<FilterContextProps | undefined>(
  undefined
);
