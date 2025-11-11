'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Movie } from '@/types';
import axios from 'axios';
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDebounce } from 'react-use';
import { SearchbarItem } from './searchbar-item';

export const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const { onOpen: handleOpenSidebar } = useSidebar();

  useDebounce(
    async () => {
      if (!search) {
        setResults([]);
        setLoading(false);
        return;
      }

      const fetchResults = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `https://advanced-internship-api-production.up.railway.app/movies?search=${search}`
          );
          setResults(data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchResults();
    },
    300,
    [search]
  );

  return (
    <div className='w-full h-20 border-b border-[#f1f3f5]'>
      <div className='flex items-center px-8 justify-between mx-auto w-full max-w-[1400px] h-full relative'>
        <div className='relative rounded-full bg-[#f1f1f3] h-11 w-full max-w-[435px]'>
          <input
            type='text'
            className='outline-none border-none w-full h-full px-4 py-2 pl-10 placeholder:text-[#667085] placeholder:text-[13px] placeholder:font-medium font-medium text-[13px]'
            placeholder='Search for movies...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaMagnifyingGlass size={16} className='absolute left-4 top-1/2 -translate-y-1/2 ' />
        </div>
        <div
          className={cn(
            'absolute left-8 top-20 w-full max-w-[440px] z-10 shadow-[0_0_6px_0_rgba(0,0,0,.14)] rounded-[20px] max-h-[440px] border border-[#e1e7ea] bg-background',
            search ? 'block' : 'hidden'
          )}
        >
          <h1 className='px-6 py-3 text-[16px] border-b font-bold border-[#e1e7ea]'>Search Results</h1>
          <div className='overflow-y-auto max-h-[calc(440px-48px)]'>
            {loading &&
              results.length === 0 &&
              new Array(7).fill(0).map((_, index) => <SearchbarItem.Skeleton key={index} />)}
            {!loading && results.length === 0 && (
              <div className='p-6 text-center font-medium text-[#1f2328]'>
                <h3 className='font-bold text-lg'>No results.</h3>
                <p className='text-[#667085]'>Please try again.</p>
              </div>
            )}
            {!loading &&
              results.length > 0 &&
              results.map(result => (
                <SearchbarItem
                  key={result.id}
                  movie={result}
                  onSelect={() => {
                    setSearch('');
                    setResults([]);
                  }}
                />
              ))}
          </div>
        </div>
        <RxHamburgerMenu
          size={32}
          className='cursor-pointer lg:invisible visible ml-5'
          onClick={() => {
            handleOpenSidebar();
          }}
        />
      </div>
    </div>
  );
};
