import styled from 'styled-components';

export const FooterContainer = styled.footer`
  grid-area: footer;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color);
  padding: 20px;
  border-radius: var(--border);
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: var(--color);
`;
