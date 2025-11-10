'use client';

import { auth } from '@/firebase';
import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import { signOut } from 'firebase/auth';
import { MdLogin, MdLogout } from 'react-icons/md';

type Props = {
  onClick?: () => void;
};

export const LogoutBtn = ({ onClick }: Props) => {
  const { user } = useAuth();
  const { onOpen: handleOpenAuthModal } = useDialog();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className='my-0.5 mx-3 p-3 rounded-lg font-medium text-[14px] text-[#565b67] flex items-center gap-2 hover:bg-[#3205800b] hover:text-[#320580] transition-all duration-100 cursor-pointer'
      onClick={() => {
        if (user) {
          handleLogout();
          onClick?.();
        } else {
          handleOpenAuthModal();
        }
      }}
    >
      {user ? <MdLogout size={15} /> : <MdLogin size={15} />}
      {user ? 'Logout' : 'Login'}
    </div>
  );
};
