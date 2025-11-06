'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuth = create<AuthState>(set => ({
  user: null,
  loading: true,
  setUser: (user: User) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
}));
