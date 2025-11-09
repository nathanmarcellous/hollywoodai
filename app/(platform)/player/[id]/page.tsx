'use client';

import { Player } from '@/components/player';
import { Movie } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`https://advanced-internship-api-production.up.railway.app/movies/${id}`);
      setMovie(data.data);
      console.log(data.data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

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
