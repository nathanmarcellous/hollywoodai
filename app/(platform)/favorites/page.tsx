'use client';

import { MovieCard } from '@/components/movie-card';
import { Skeleton } from '@/components/ui/skeleton';
import { getFavorites } from '@/firebase/favorites';
import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import { Movie } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const { user, loading: userLoading } = useAuth();
  const { onOpen: handleOpenAuthModal } = useDialog();

  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavorites(favorites || []);
      setLoading(false);
    };
    fetchFavorites();
  }, [user]);

  if (userLoading || loading) {
    return (
      <div className='py-10 px-8'>
        <h1 className='text-[24px] font-bold mb-2'>Saved Movies</h1>

        <>
          <div className='flex flex-col gap-2 pb-6 mb-8 border-b border-[#e1e7ea]'>
            <div>
              <Skeleton className='h-5 w-32 rounded-xs' />
            </div>
          </div>
          <div className='flex flex-wrap gap-4 mb-4'>
            {new Array(7).fill(0).map((_, index) => (
              <div key={index} className='embla__favorite'>
                <MovieCard.Skeleton />
              </div>
            ))}
          </div>
        </>
      </div>
    );
  }

  return (
    <div className='py-10 px-8'>
      <h1 className='text-[24px] font-bold mb-2'>Saved Movies</h1>
      {!!user && (
        <h2 className='text-[rgba(64,70,84,.7)] text-[18px] font-light pb-4 mb-8 border-b border-[#f1f3f4]'>
          {favorites.length} Movies
        </h2>
      )}

      {!!user && favorites.length > 0 && (
        <>
          <div className='flex flex-wrap gap-8 mb-4 justify-start'>
            {favorites.map(movie => (
              <div key={movie.id} className='embla__favorite'>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}

      {!!user && favorites.length === 0 && (
        <>
          <div className='flex flex-wrap gap-4 mb-4'>
            <div className='bg-[#f1f3f4] rounded-xl p-8 mx-auto max-w-[460px] text-center'>
              <h3 className='text-[18px] font-bold mb-2'>Save your favorite movies!</h3>
              <p className='text-[16px] font-light'>When you save a movie, it will appear here.</p>
            </div>
          </div>
        </>
      )}

      {!user && (
        <>
          <h2 className='text-[rgba(64,70,84,.7)] text-[18px] font-light pb-4 mb-8 border-b border-[#f1f3f4]'></h2>
          <div className='max-w-[460px] mx-auto'>
            <figure className='relative w-full'>
              <Image src='/assets/login.webp' alt='login' width={460} height={264} className='object-cover' />
            </figure>
            <p className='text-[24px] font-bold text-center mb-4'>Sign in to see your favorited movies</p>
            <button
              className='bg-[#320580] text-white w-[180px] h-11 rounded-md text-[16px] mx-auto block cursor-pointer'
              onClick={handleOpenAuthModal}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
