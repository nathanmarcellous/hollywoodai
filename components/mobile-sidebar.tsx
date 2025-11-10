'use client';

import Image from 'next/image';
import { FaRegBookmark, FaSearch } from 'react-icons/fa';
import { IoIosTrendingUp, IoMdSettings } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbHelp } from 'react-icons/tb';

import { useSidebar } from '@/hooks/use-sidebar';

import { SidebarLink } from './sidebar-link';
import { LogoutBtn } from './logout-btn';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

export const MobileSidebar = () => {
  const { isOpen, onClose } = useSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='left'>
        <SheetHeader className='sr-only'>
          <SheetTitle>Mobile Sidebar</SheetTitle>
          <SheetDescription>Mobile Sidebar</SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-8 py-6 '>
          <Image src='/assets/logo-dark.png' alt='logo' width={140} height={40} loading='eager' className='mx-6' />
          <div className='flex flex-col'>
            <span className='text-[10px] font-medium text-[#565b67] uppercase tracking-[1px] mx-6 mb-2'>Links</span>
            <SidebarLink title='Dashboard' Icon={MdOutlineDashboard} href='/dashboard' onClick={onClose} />
            <SidebarLink title='Favorites' Icon={FaRegBookmark} href='/favorites' onClick={onClose} />
            <SidebarLink title='Search' Icon={FaSearch} disabled />
            <SidebarLink title='Trending' Icon={IoIosTrendingUp} disabled />
          </div>
          <div className='flex flex-col'>
            <span className='text-[10px] font-medium text-[#565b67] uppercase tracking-[1px] mx-6 mb-2'>Extras</span>
            <SidebarLink title='Help & Support' Icon={TbHelp} disabled />
            <SidebarLink title='Settings' Icon={IoMdSettings} href='/settings' onClick={onClose} />
            <LogoutBtn onClick={onClose} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
