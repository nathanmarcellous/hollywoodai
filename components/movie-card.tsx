'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaRegClock, FaRegStar } from 'react-icons/fa';

import { Skeleton } from '@/components/ui/skeleton';
import { Movie } from '@/types';

const audioApi = 'https://advanced-internship-api-production.up.railway.app/';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<string>('00:00');

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const seconds = Math.floor(audio.duration || 0);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    setDuration(`${mins}:${secs.toString().padStart(2, '0')}`);
  };

  return (
    <Link href={`/movie/${movie.id}`} className='cursor-pointer'>
      <figure className='aspect-2/3 mb-1 relative h-full w-full'>
        <Image
          src={movie.imageLink}
          alt={movie.title}
          className='w-full h-full object-cover rounded-xl'
          fill
          sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw'
        />
        {movie.subscriptionRequired && (
          <div className='absolute -top-2.5 bg-[rgba(50,5,128,.767)] rounded-xl text-[10px] font-light left-1/2 translate-x-[-50%] text-white z-20 py-[3px] px-2.5'>
            Premium
          </div>
        )}
      </figure>
      <audio
        ref={audioRef}
        src={`${audioApi}${movie.audioLink}`}
        onLoadedMetadata={onLoadedMetadata}
        className='hidden'
      />

      <div>
        <p className='text-[14px] font-bold mb-0.5'>{movie.title}</p>
        <p className='text-[12px] text-[rgba(64,70,84,.7)] font-light mb-0.5'>{movie.director}</p>
        <div className='flex items-center gap-2'>
          <span className='text-[12px] text-[rgba(64,70,84,.7)] flex items-center gap-1'>
            <FaRegClock />
            {duration}
          </span>
          <span className='text-[12px] text-[rgba(64,70,84,.7)] flex items-center gap-1'>
            <FaRegStar />
            {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

MovieCard.Skeleton = () => {
  return (
    <div className='cursor-pointer'>
      <figure className='aspect-2/3 mb-2.5 relative h-full w-full'>
        <Skeleton className='w-full h-full rounded-xl' />
      </figure>
      <div>
        <Skeleton className='w-full h-2 mb-1.5' />
        <Skeleton className='w-1/2 h-2 mb-1.5' />
        <Skeleton className='w-4/5 h-2 mb-1' />
      </div>
    </div>
  );
};
