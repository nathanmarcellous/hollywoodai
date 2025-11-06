'use client';

import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

export const LogoutBtn = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
