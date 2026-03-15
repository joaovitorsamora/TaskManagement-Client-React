import { LogOut } from 'lucide-react';

import {
  LoginButton,
  UserContainer,
  Overlay,
  Modal,
  SubmitButton,
  CancelButton,
} from './HeaderLogin.styles';
import type { LoginInput } from '../../types';
import { useAuth } from '../context/useAuth';

interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

interface HeaderLoginProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClickLogin?: () => void;
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogin: (l: LoginInput) => void;
  isModalOpen?: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: User;
}

export const HeaderLogin = ({
  onClickLogin,
  isModalOpen,
  setIsModalOpen,
  handleLogin,
  newUser,
  setNewUser,
  loggedUser,
}: HeaderLoginProps) => {
  const { logout } = useAuth();

  return (
    <>
      {!loggedUser ? (
        <LoginButton onClick={onClickLogin}>Login</LoginButton>
      ) : (
        <UserContainer>
          <img
            src="account-avatar-profile-user.svg"
            alt="Avatar"
            className="avatar"
          />
          <LogOut onClick={logout} />
        </UserContainer>
      )}

      {isModalOpen && (
        <Overlay onClick={() => setIsModalOpen(false)}>
          <Modal
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(newUser);
              
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={newUser?.nome || ''}
              onChange={(e) =>
                setNewUser?.({ ...newUser!, nome: e.target.value })
              }
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={newUser?.senha || ''}
              onChange={(e) =>
                setNewUser?.({ ...newUser!, senha: e.target.value })
              }
              required
            />

            <SubmitButton type="submit">Entrar</SubmitButton>
            <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </CancelButton>
          </Modal>
        </Overlay>
      )}
    </>
  );
};
