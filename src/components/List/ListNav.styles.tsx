import styled from 'styled-components';

export const ListaNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

export const ListaItem = styled.li`
  color: var(--color-text-secondary);
  &:hover {
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-surface-2);
    border-radius: 10px;
    color: var(--color);
    cursor: pointer;
    padding: 0 0.2rem;
    width: 100%;
    font-weight: 600;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: var(--color);
`;
