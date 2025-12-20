import { useEffect } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderLogin } from './HeaderLogin';
import { HeaderSearch } from './HeaderSearch';
import { HeaderRegisterUser } from './HeaderRegisterUser';
import { HeaderContainer, HeaderActions } from './Header.styles';
import { useUser } from '../../hooks/useUsers';

interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

export const Header = () => {
  const {
    newUser,
    setNewUser,
    handleCreateUser,
    loggedUser,
    handleLogin,
    isLoginOpen,
    isRegisterOpen,
    setIsRegisterOpen,
    setIsLoginOpen,
  } = useUser();

  useEffect(() => {
    const handleOpen = () => setIsLoginOpen(true);
    document.addEventListener('openLoginModal', handleOpen);
    return () => document.removeEventListener('openLoginModal', handleOpen);
  }, [setIsLoginOpen]);

  return (
    <HeaderContainer>
      <HeaderActions>
        <HeaderLogo />

        <HeaderSearch />

        <HeaderNav />
        <HeaderActions style={{ gap: '14px', justifyContent: 'flex-end' }}>
          <HeaderRegisterUser
            isOpen={isRegisterOpen}
            setIsOpen={setIsRegisterOpen}
            handleCreateUser={handleCreateUser}
            loggedUser={loggedUser as User}
            newUser={newUser}
            setNewUser={setNewUser}
            onClickSignUp={() => setIsRegisterOpen(true)}
          />

          <HeaderLogin
            isOpen={isLoginOpen}
            setIsOpen={setIsLoginOpen}
            handleLogin={handleLogin}
            loggedUser={loggedUser as User}
            newUser={newUser}
            setNewUser={setNewUser}
            isModalOpen={isLoginOpen}
            setIsModalOpen={setIsLoginOpen}
            onClickLogin={() => setIsLoginOpen(true)}
          />
        </HeaderActions>
      </HeaderActions>
    </HeaderContainer>
  );
};
