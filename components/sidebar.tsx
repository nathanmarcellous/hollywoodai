'use client';

import Image from 'next/image';
import { FaRegBookmark, FaSearch } from 'react-icons/fa';
import { IoIosTrendingUp, IoMdSettings } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbHelp } from 'react-icons/tb';
import { useMedia } from 'react-use';

import { LogoutBtn } from './logout-btn';
import { MobileSidebar } from './mobile-sidebar';
import { SidebarLink } from './sidebar-link';

export const Sidebar = () => {
  const isMobile = useMedia('(max-width: 1023px)', false);

  if (isMobile) {
    return <MobileSidebar />;
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-[230px] h-screen border-r border-[#f1f3f4] bg-background py-6 lg:flex flex-col gap-8 hidden'>
      <Image src='/assets/logo-dark.png' alt='logo' width={140} height={40} loading='eager' className='mx-6' />
      <div className='flex flex-col'>
        <span className='text-[10px] font-medium text-[#565b67] uppercase tracking-[1px] mx-6 mb-2'>Links</span>
        <SidebarLink title='Dashboard' Icon={MdOutlineDashboard} href='/dashboard' />
        <SidebarLink title='Favorites' Icon={FaRegBookmark} href='/favorites' />
        <SidebarLink title='Search' Icon={FaSearch} disabled />
        <SidebarLink title='Trending' Icon={IoIosTrendingUp} disabled />
      </div>
      <div className='flex flex-col'>
        <span className='text-[10px] font-medium text-[#565b67] uppercase tracking-[1px] mx-6 mb-2'>Extras</span>
        <SidebarLink title='Help & Support' Icon={TbHelp} disabled />
        <SidebarLink title='Settings' Icon={IoMdSettings} href='/settings' />
        <LogoutBtn />
      </div>
    </div>
  );
};
