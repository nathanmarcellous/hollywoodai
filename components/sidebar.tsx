import Image from 'next/image';
import { MdOutlineDashboard, MdLogout } from 'react-icons/md';
import { FaRegBookmark, FaSearch } from 'react-icons/fa';
import { IoIosTrendingUp, IoMdSettings } from 'react-icons/io';
import { SidebarLink } from './sidebar-link';
import { TbHelp } from 'react-icons/tb';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { LogoutBtn } from './logout-btn';

export const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-[230px] h-screen border-r border-[#f1f3f4] bg-background py-6 md:flex flex-col gap-8 hidden'>
      <Image
        src='/assets/logo-dark.png'
        alt='logo'
        width={140}
        height={40}
        loading='lazy'
        className='mx-6'
      />
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
