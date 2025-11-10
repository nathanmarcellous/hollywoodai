import { SearchBar } from '@/components/searchbar';
import { Sidebar } from '@/components/sidebar';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />

      <div className='lg:ml-[230px] '>
        <SearchBar />
        {children}
      </div>
    </>
  );
}
