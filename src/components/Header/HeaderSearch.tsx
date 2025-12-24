import { useState } from 'react';
import './css/HeaderSearch.css';

import { useFilter } from '../../components/index';
import { useTasks } from '../context/useTasks';
export const HeaderSearch = () => {
  const { setSearchItemValue } = useFilter();
  const { lista } = useTasks();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const results = lista.filter((item) =>
      item.titulo.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchItemValue(results);
    setInputValue('');
  };

  return (
    <section className="search" role="search" aria-label="Buscar tarefas">
      <label className="u-sr-only" htmlFor="q">
        Buscar
      </label>
      <input
        className="search__input"
        id="q"
        name="q"
        type="search"
        value={inputValue}
        placeholder="Buscar tarefas..."
        autoComplete="off"
        onChange={handleSearch}
      />
      <button
        className="btn btn--ghost search__btn"
        type="button"
        aria-label="Pesquisar"
        onClick={handleClick}
      >
        🔍
      </button>
    </section>
  );
};
