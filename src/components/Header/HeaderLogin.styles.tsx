import styled from 'styled-components';

export const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img.avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    object-fit: cover;
  }

  svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.transition};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  padding: 26px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  width: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }

  input {
    padding: 12px;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: ${({ theme }) => theme.transition};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary}77;
    }
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;

export const CancelButton = styled.button`
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;
