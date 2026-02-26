import { Option } from './Filter.styles';

interface Prop {
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
}

export const FilterOption = ({
  type,
  name,
  label,
  value,
  checked,
  onChange,
}: Prop) => {
  return (
    <Option>
      <input
        type={type}
        name={name}
        value={value}
        onChange={() => onChange}
        checked={checked}
      />
      {label}
    </Option>
  );
};
