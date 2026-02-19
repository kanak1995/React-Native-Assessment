import { create } from 'zustand';
import { getToken, saveToken, saveUserId, clearToken } from '../utils/storage';
import { loginApi } from '../api/auth.api';
import { debugLog } from '../../logger';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  status: 'loading',

  initialize: async () => {
    try {
      const token = await getToken();
      if (token) {
        // In a real app, we'd fetch user profile here
        set({ token, status: 'authenticated' });
      } else {
        set({ status: 'unauthenticated' });
      }
    } catch (error) {
      set({ status: 'unauthenticated' });
    }
  },

  login: async (email, password) => {
    debugLog(email, password)
    const res = await loginApi(email.toLocaleLowerCase(), password);
    await saveToken(res.token);
    await saveUserId(res.user.id.toString());
    
    set({
      token: res.token,
      user: res.user,
      status: 'authenticated',
    });
  },

  logout: async () => {
    await clearToken();
    set({
      token: null,
      user: null,
      status: 'unauthenticated',
    });
  },
}));
