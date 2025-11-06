'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog';
import { AuthModalContent } from './auth-modal-content';

export const AuthModal = () => {
  const { isOpen, onClose } = useDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-screen h-screen max-w-none rounded-none min-[500px]:w-[400px] min-[500px]:h-[640px] min-[500px]:max-w-[400px] min-[500px]:rounded-lg transition-none'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>Log in, sign up or reset your password to continue</DialogDescription>
        </DialogHeader>
        <AuthModalContent />
      </DialogContent>
    </Dialog>
  );
};
