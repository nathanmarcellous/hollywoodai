'use client';

import { useAuth } from '@/hooks/use-auth';

export default function Settings() {
  const { user } = useAuth();
  return (
    <div className='py-10 px-8'>
      <h1 className='text-[32px] font-bold border-b border-[#e1e7ea] pb-4 mb-8'>Settings</h1>
      <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
        <h2 className='text-[18px] font-semibold'>Email</h2>
        <p className='text-[rgba(64,70,84,.7)] text-[14px]'>{user?.email}</p>
      </div>
    </div>
  );
}
