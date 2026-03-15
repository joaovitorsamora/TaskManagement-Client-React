import { useEffect, useState, useCallback } from 'react';
import type { LoginInput, RegisterInput } from './Users.types';

export type User = {
  id?: number;
  nome: string;
  email: string;
  senha: string;
};

type AuthResult = {
  success: boolean;
  message?: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('authToken')
  );
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const authApiLogin = import.meta.env.VITE_API_URL_LOGIN || '';
  const authApiRegister = import.meta.env.VITE_API_URL_REGISTER || '';
  const userLoggedURL = import.meta.env.VITE_API_URL_ME || '';

  const persistToken = useCallback((t: string | null) => {
    if (t) localStorage.setItem('authToken', t);
    else localStorage.removeItem('authToken');
    setToken(t);
  }, [ setToken ]);

  const login = useCallback(
    async (input: LoginInput): Promise<AuthResult> => {
      if (!input.nome || !input.senha) {
        console.log('Campo de login nome e senha vazios');
        return { success: false, message: 'Preencha todos os campos!' };
      }

      try {
        setLoadingAuth(true);
        const response = await fetch(authApiRegister, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nome: input.nome,
            Senha: input.senha,
          }),
        });

        if (!response.ok) {
          return { success: false, message: 'Credenciais inválidas.' };
        }

        const data = await response.json();
        persistToken(data.token);
        setUser(data.user);

        return { success: true };
      } catch {
        return { success: false, message: 'Erro de conexão' };
      } finally {
        setLoadingAuth(false);
      }
    },
    [authApiRegister, persistToken, setUser, setLoadingAuth]
  );

  const register = useCallback(
    async (input: RegisterInput): Promise<AuthResult> => {
      if (!input.nome || !input.email || !input.senha) {
        return { success: false, message: 'Preencha todos os campos!' };
      }

      try {
        setLoadingAuth(true);
        const response = await fetch(authApiLogin, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nome: input.nome,
            Email: input.email,
            Senha: input.senha,
          }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          return {
            success: false,
            message: err.message || 'Erro ao registrar',
          };
        }

        return { success: true };
      } catch {
        return { success: false, message: 'Erro de conexão' };
      } finally {
        setLoadingAuth(false);
      }
    },
    [authApiLogin, setLoadingAuth]
  );

  const logout = useCallback(() => {
    persistToken(null);
    setUser(null);
  }, [persistToken, setUser]);

  useEffect(() => {
    if (!token || !userLoggedURL) {
      setLoadingSession(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(userLoggedURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          persistToken(null);
        }
      } catch {
        persistToken(null);
      } finally {
        setLoadingSession(false);
      }
    };

    fetchUser();
  }, [token, userLoggedURL, persistToken, setUser]);

  return {
    user,
    token,
    isAuthenticated: !!user,
    loadingSession,
    loadingAuth,
    login,
    register,
    logout,
  };
};
