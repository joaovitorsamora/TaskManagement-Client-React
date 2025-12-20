import styled from 'styled-components';

export const FormContainer = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  input,
  select {
    background: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 10px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;

export const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.textSecondary};
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;
