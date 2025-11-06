'use client'

import { AuthModal } from '@/components/auth-modal';
import { useMountedState } from 'react-use';

export const ModalProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};
