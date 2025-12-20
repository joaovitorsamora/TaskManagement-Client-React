import styled from 'styled-components';

export const InnerLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: ${({ theme }) => theme.transition};
`;
