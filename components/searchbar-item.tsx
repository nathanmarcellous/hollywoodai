'use client';

import { Movie } from '@/types';
import { AUDIO_API } from '@/lib/utils';
import Image from 'next/image';
import { FaRegClock } from 'react-icons/fa';
import { formatTime } from '@/lib/utils';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

export const SearchbarItem = ({ movie, onSelect }: { movie: Movie; onSelect: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.duration !== undefined) {
      setDuration(audio.duration);
    }
  };

  return (
    <Link
      href={`/movie/${movie.id}`}
      onClick={onSelect}
      className='flex items-center gap-6 h-[120px] p-6 border-b last:border-b-0 border-[#e1e7ea]'
    >
      <audio
        ref={audioRef}
        src={`${AUDIO_API}${movie.audioLink}`}
        onLoadedMetadata={onLoadedMetadata}
        className='hidden'
      />
      <div className='relative h-[88px] w-[60px] shrink-0'>
        <Image src={movie.imageLink} alt={movie.title} fill className='object-cover rounded-sm' sizes='60px' />
      </div>
      <div className='flex flex-col'>
        <p className='text-[16px] font-medium mb-1.5'>{movie.title}</p>
        <p className='text-[14px] font-light text-[#6b757b] mb-1.5'>{movie.director}</p>
        <span className='text-[14px] font-light text-[#6b757b] flex items-center gap-1'>
          <FaRegClock />
          {formatTime(duration)}
        </span>
      </div>
    </Link>
  );
};

SearchbarItem.Skeleton = () => {
  return (
    <div className='flex items-center gap-6 h-[120px] p-6 border-b last:border-b-0 border-[#e1e7ea]'>
      <div className='relative h-[88px] w-[60px] shrink-0'>
        <Skeleton className='w-full h-full rounded-sm' />
      </div>
      <div className='flex flex-col flex-1 h-full'>
        <Skeleton className='w-[102px] h-4 rounded-xs mb-1.5' />
        <Skeleton className='w-[72px] h-4 rounded-xs mb-1.5' />
        <Skeleton className='w-16 h-4 rounded-xs mb-1' />
      </div>
    </div>
  );
};
