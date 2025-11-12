'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import { loadPortal } from '@/stripe/stripePayment';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Settings() {
  const { user, isPremium, loading: userLoading } = useAuth();
  const { onOpen: handleOpenAuthModal } = useDialog();
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      await loadPortal();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className='py-10 px-8'>
        <h1 className='text-[32px] font-bold border-b border-[#e1e7ea] pb-4 mb-8'>Settings</h1>

        <>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <h2 className='text-[18px] font-semibold'>Your Subscription Plan</h2>
            <Skeleton className='h-5 w-20 rounded-xs' />
            <Skeleton className='h-12 w-36 rounded-xs' />
          </div>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <h2 className='text-[18px] font-semibold'>Email</h2>
            <Skeleton className='h-5 w-40 rounded-xs' />
          </div>
        </>
      </div>
    );
  }

  return (
    <div className='py-10 px-8'>
      <h1 className='text-[32px] font-bold border-b border-[#e1e7ea] pb-4 mb-8'>Settings</h1>

      {user ? (
        <>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <h2 className='text-[18px] font-semibold'>Your Subscription Plan</h2>
            <p>{isPremium ? isPremium : 'Basic'}</p>
            {isPremium ? (
              <button
                onClick={handleManageSubscription}
                className='flex items-center justify-center cursor-pointer text-[14px] bg-[#320580] rounded-md py-3 px-4 w-fit text-white'
              >
                {loading ? (
                  <>
                    Manage Subscription
                    <Loader2 className='w-4 h-4 animate-spin ml-2' />
                  </>
                ) : (
                  <>
                    Manage Subscription
                    <Image src='/assets/bolt.svg' alt='play' width={12} height={12} className='ml-2' />
                  </>
                )}
              </button>
            ) : (
              <Link href='/plans'>
                <button className='flex items-center justify-center cursor-pointer text-[14px] bg-[#320580] rounded-md py-3 px-4 w-fit text-white'>
                  Upgrade
                  <Image src='/assets/bolt.svg' alt='play' width={12} height={12} className='ml-2' />
                </button>
              </Link>
            )}
          </div>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <h2 className='text-[18px] font-semibold'>Email</h2>
            <p>{user.email}</p>
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
