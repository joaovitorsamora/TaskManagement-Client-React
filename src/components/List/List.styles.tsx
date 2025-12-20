import styled from 'styled-components';

export const ListAside = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const ListTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;
