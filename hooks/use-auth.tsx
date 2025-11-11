'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isPremium: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsPremium: (isPremium: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useAuth = create<AuthState>(set => ({
  user: null,
  isPremium: null,
  loading: true,
  setUser: user => set({ user }),
  setIsPremium: isPremium => set({ isPremium }),
  setLoading: loading => set({ loading }),
  clearUser: () => set({ user: null, isPremium: null }),
}));
