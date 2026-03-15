import { createContext } from 'react';
import type { LoginInput, RegisterInput } from '../../types';

export type User = {
  id?: number;
  nome: string;
  email: string;
  senha: string;
};

export type AuthResult = {
  success: boolean;
  message?: string;
};

export interface UserContextType {
  user: User | null
 setUser: (user: User | null) => void;
    token: string | null;
    isAuthenticated: boolean;
    loadingSession: boolean;
    loadingAuth: boolean;
    login: (input: LoginInput) => Promise<AuthResult>;
    register: (input: RegisterInput) => Promise<AuthResult>;
    logout: () => void;
}



export const AuthContext = createContext<UserContextType>({} as UserContextType);
