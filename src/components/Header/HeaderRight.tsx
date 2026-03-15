import { useState } from 'react';
import { HeaderActions } from './Header.styles';
import { HeaderLogin } from './HeaderLogin';
import { HeaderRegisterUser } from './HeaderRegisterUser';
import { useAuth } from '../context/useAuth';

interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

export const HeaderRight = () => {
  const { register, login, user } = useAuth();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    nome: '',
    email: '',
    senha: '',
  });

  const users = user!;

  return (
    <HeaderActions>
      <HeaderRegisterUser
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        handleCreateUser={register}
        loggedUser={users}
        newUser={newUser}
        setNewUser={setNewUser}
        onClickSignUp={() => setIsRegisterOpen(true)}
      />

      <HeaderLogin
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        handleLogin={login}
        loggedUser={users}
        newUser={newUser}
        setNewUser={setNewUser}
        isModalOpen={isLoginOpen}
        setIsModalOpen={setIsLoginOpen}
        onClickLogin={() => setIsLoginOpen(true)}
      />
    </HeaderActions>
  );
};
