'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuth } from '@/hooks/use-auth';
import { getSubscriptionStatus } from '@/stripe/getPremiumStatus';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser, setIsPremium, setLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setLoading(true);

      if (user) {
        try {
          setUser(user);
          const subscription = await getSubscriptionStatus(user.uid);
          setIsPremium(subscription);
        } catch (err) {
          console.error('Failed to fetch subscription', err);
          setIsPremium(null);
        }
      } else {
        clearUser();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setIsPremium, setLoading]);

  return <>{children}</>;
}
