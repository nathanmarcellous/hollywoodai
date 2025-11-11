'use client';

import { Player } from '@/components/player';
import { useAuth } from '@/hooks/use-auth';
import { Movie } from '@/types';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { isPremium, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`https://advanced-internship-api-production.up.railway.app/movies/${id}`);
        setMovie(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!movie || authLoading) return;

    const requiresSubscription = Boolean(movie.subscriptionRequired);
    const hasActiveSubscription = Boolean(isPremium);

    if (requiresSubscription && !hasActiveSubscription) {
      router.replace('/plans');
    }
  }, [movie, isPremium, authLoading, router]);

  if (loading)
    return (
      <div className='w-full flex items-center justify-center h-[calc(100vh-160px)] pt-10'>
        <Loader2 className='w-8 h-8 animate-spin stroke-1' />
      </div>
    );

  if (!movie)
    return (
      <div className='w-full flex items-center justify-center h-[calc(100vh-160px)] pt-10'>
        <div className='text-xl font-bold'>No Movie Found.</div>
      </div>
    );

  return (
    <div className='pt-10 relative w-full overflow-y-auto h-[calc(100vh-160px)]'>
      <div className='px-8 max-w-[1400px] mx-auto'>
        <h1 className='text-[24px] mb-8 border-b border-[#e1e7ea] pb-4 font-bold'>{movie.title}</h1>
        <p className='pb-10 leading-[1.4] whitespace-pre-line'>{movie.summary}</p>
      </div>
      <Player movie={movie} />
    </div>
  );
}
