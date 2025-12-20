import styled from 'styled-components';

export const AsideContainer = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  min-width: 260px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: ${({ theme }) => theme.shadow.md};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const AsideGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
