export interface FilterOptionsItem {
  label: string;
  value: string;
}

export interface FilterGroupsProp {
  legend: string;
  option: FilterOptionsItem[];
  selected: string;
  onChange: (value: string) => void;
  type?: 'radio' | 'checkbox';
}
