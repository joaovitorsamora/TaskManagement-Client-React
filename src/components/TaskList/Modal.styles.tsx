import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

export const ModalContainer = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};

  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: ${({ theme }) => theme.transition};

  input {
    background: ${({ theme }) => theme.colors.surface2};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.radius.sm};
    outline: none;
    transition: ${({ theme }) => theme.transition};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.primary}55;
    }
  }

  button {
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-weight: 600;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
  }
`;

export const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const CancelButton = styled.button`
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    filter: brightness(1.05);
  }
`;
