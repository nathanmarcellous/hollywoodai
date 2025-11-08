'use client';

import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import Image from 'next/image';

export default function Settings() {
  const { user } = useAuth();
  const { onOpen: handleOpenAuthModal } = useDialog();

  return (
    <div className='py-10 px-8'>
      <h1 className='text-[32px] font-bold border-b border-[#e1e7ea] pb-4 mb-8'>Settings</h1>

      {user ? (
        <>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <h2 className='text-[18px] font-semibold'>Email</h2>
            <p className='text-[rgba(64,70,84,.7)] text-[14px]'>{user.email}</p>
          </div>
        </>
      ) : (
        <div className='max-w-[460px] mx-auto'>
          <figure className='relative w-full'>
            <Image src='/assets/login.webp' alt='login' width={460} height={264} className='object-cover' />
          </figure>
          <p className='text-[24px] font-bold text-center mb-4'>Sign in to see your account settings</p>
          <button
            className='bg-[#320580] text-white w-[180px] h-11 rounded-md text-[16px] mx-auto block cursor-pointer'
            onClick={handleOpenAuthModal}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
