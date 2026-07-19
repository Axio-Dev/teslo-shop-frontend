import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  role: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Implementación del store

  // Estado inicial de las opciones de 'AuthState'
  user: null,
  token: null,
  role: null,
  authStatus: 'checking',

  // Getters

  isAdmin: () => {
    const role = get().user?.role || '';

    return role.includes('admin');
  },

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, authStatus: 'authenticated' });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: 'authenticated',
      });
      return true;
    } catch (error) {
      console.log({ error });
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated',
      });
      return false;
    }
  },
}));
