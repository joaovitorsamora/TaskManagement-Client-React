import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  button {
    background: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    border: none;
    padding: 10px 14px;
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      filter: brightness(1.1);
    }
  }
`;
