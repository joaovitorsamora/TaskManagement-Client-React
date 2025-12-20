import styled from 'styled-components';

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  transition: ${({ theme }) => theme.transition};
`;

export const Heading = styled.div`
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 4px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  select {
    background: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.text};
    padding: 10px 12px;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    outline: none;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
