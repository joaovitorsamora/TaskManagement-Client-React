import { Legend, CheckGroup } from './Filter.styles';
import type { FilterGroupsProp } from './Filter.types';
import { FilterOption } from './FilterOption';

export const FilterGroup = ({
  legend,
  type = 'radio',
  option,
  selected,
  onChange,
}: FilterGroupsProp) => {
  return (
    <>
      <Legend>{legend}</Legend>

      <CheckGroup>
        {option.map((opt) => (
          <FilterOption
            label={opt.label}
            name={legend}
            type={type}
            value={opt.value}
            checked={selected === opt.value}
            onChange={onChange}
          ></FilterOption>
        ))}
      </CheckGroup>
    </>
  );
};
