'use client';

import { SearchBar } from '@/components/searchbar';
import { useAuth } from '@/hooks/use-auth';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <div className='w-full py-6 px-8 border-b border-[#f1f3f4]'>
        <h1 className='text-[33px] font-bold'>AI Movie Summariser</h1>
        <p className='text-[rgba(64,70,84,.7)] text-[14px]'>Enjoy high-quality summaries of your favourite movies instantly without breaking a sweat.</p>
      </div>
      {user?.email}
    </>
  );
}
