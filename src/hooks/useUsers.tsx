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

  // Fallback para string vazia evita que a URL fique ".../undefined"
  const authApiLogin = import.meta.env.VITE_API_URL_LOGIN || '';
  const authApiRegister = import.meta.env.VITE_API_URL_REGISTER || '';
  const userLoggedURL = import.meta.env.VITE_API_URL_ME || '';

  const createUser = useCallback(async (): Promise<AuthResult> => {
    if (!newUser.nome || !newUser.email || !newUser.senha) {
      return { success: false, message: 'Preencha todos os campos!' };
    }

    try {
      setLoading(true);
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
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || 'Erro ao registrar usuário.',
        };
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      return { success: false, message: 'Erro de conexão com o servidor.' };
    } finally {
      setLoading(false);
    }
  }, [newUser, authApiRegister]);

  const login = useCallback(async (): Promise<AuthResult> => {
    // Verifique se o backend espera 'Nome' ou 'Email' no login
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
      return {
        success: false,
        message: 'Erro de conexão ao tentar fazer login.',
      };
    } finally {
      setLoading(false);
    }
  }, [newUser, authApiLogin]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setLoggedUser(null);
    setIsLoginOpen(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token || !userLoggedURL) {
      setLoggedUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(userLoggedURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedUser(data);
        } else {
          localStorage.removeItem('authToken');
          setLoggedUser(null);
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err);
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
