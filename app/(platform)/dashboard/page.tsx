'use client';

import { LogoutBtn } from '@/components/logout-btn';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className='space-y-4'>
      <Link href='/'>Home</Link>
      <p>{user?.email}</p>
      <LogoutBtn />
    </div>
  );
}
