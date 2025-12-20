import { useEffect, useState, useCallback } from 'react';

export type User = {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
};

type AuthResult = {
  success: boolean;
  message?: string;
};

export const useUser = () => {
  const [newUser, setNewUser] = useState<User>({
    nome: '',
    email: '',
    senha: '',
  });
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const authApiLogin = import.meta.env.VITE_API_URL_AUTH_LOGIN;
  const authApiRegister = import.meta.env.VITE_API_URL_AUTH_REGISTER;
  const userLoggedURL = import.meta.env.VITE_API_URL_AUTH_ME;

  const createUser = useCallback(async (): Promise<AuthResult> => {
    if (!newUser.nome || !newUser.email || !newUser.senha) {
      return { success: false, message: 'Preencha todos os campos!' };
    }

    try {
      const response = await fetch(authApiRegister, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nome: newUser.nome,
          Email: newUser.email,
          Senha: newUser.senha,
        }),
      });

      if (response.ok) {
        setNewUser({ nome: '', email: '', senha: '' });
        setIsRegisterOpen(false);
        return { success: true };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || response.statusText,
        };
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      return {
        success: false,
        message: 'Erro de conexão ao tentar registrar.',
      };
    }
  }, [newUser, authApiRegister]);

  const login = useCallback(async (): Promise<AuthResult> => {
    if (!newUser.nome || !newUser.senha) {
      return { success: false, message: 'Preencha o nome e a senha!' };
    }

    try {
      setLoading(true);
      const response = await fetch(authApiLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nome: newUser.nome, Senha: newUser.senha }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        setLoggedUser(data.user);
        setIsLoginOpen(false);
        return { success: true };
      } else {
        return { success: false, message: 'Credenciais inválidas.' };
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setLoading(false);
      return {
        success: false,
        message: 'Erro de conexão ao tentar fazer login.',
      };
    }
  }, [newUser, authApiLogin]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setLoggedUser(null);
    setIsLoginOpen(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoggedUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(userLoggedURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem('authToken');
          setLoggedUser(null);
          return;
        }

        const data = await response.json();
        setLoggedUser(data);
      } catch (err) {
        console.error('Erro ao verificar usuário logado:', err);
        setLoggedUser(null);
      }
    };

    fetchUser();
  }, [userLoggedURL]);

  return {
    newUser,
    setNewUser,
    loggedUser,
    setLoggedUser,
    loading,
    isRegisterOpen,
    setIsRegisterOpen,
    isLoginOpen,
    setIsLoginOpen,
    createUser,
    login,
    logout,
  };
};
