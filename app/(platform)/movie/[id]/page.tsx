'use client';

import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaRegClock, FaRegStar, FaMicrophone, FaRegCalendar, FaBookmark, FaRegBookmark } from 'react-icons/fa';

import { Movie } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import { AUDIO_API, formatTime } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function MoviePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();
  const { onOpen: handleOpenAuthModal } = useDialog();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.duration !== undefined) {
      setDuration(audio.duration);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`https://advanced-internship-api-production.up.railway.app/movies/${id}`);
        setMovie(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSummarise = () => {
    if (!user) {
      handleOpenAuthModal();
      return;
    }

    if (movie?.subscriptionRequired) {
      router.push('/plans');
      return;
    }

    router.push(`/player/${id}`);
  };

  if (loading)
    return (
      <div className='p-10 flex flex-col-reverse lg:flex-row items-center'>
        <div className='flex-1 w-full mt-4 lg:mt-0'>
          <div className='mb-2'>
            <Skeleton className='h-12 w-72 rounded-xs' />
          </div>
          <div className='mb-4 '>
            <Skeleton className='h-5 w-36 rounded-xs' />
          </div>
          <div className='py-4 mb-6 border-y border-[#e1e7ea]'>
            <div className='flex max-w-[400px] gap-y-3 flex-wrap'>
              <span className='inline-flex items-center w-1/2 text-[14px] gap-1.5'>
                <Skeleton className='h-5 w-24 rounded-xs' />
              </span>
              <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
                <Skeleton className='h-5 w-24 rounded-xs' />
              </span>
              <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
                <Skeleton className='h-5 w-24 rounded-xs' />
              </span>
              <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
                <Skeleton className='h-5 w-24 rounded-xs' />
              </span>
            </div>
          </div>
          <Skeleton className='h-12 w-72 mb-2 rounded-xs' />
          <Skeleton className='h-6 w-72 mb-4 rounded-xs' />
          <div className='mb-4'>
            <Skeleton className='h-6 w-36 rounded-xs' />
          </div>
          <div className='flex flex-wrap gap-4 mb-4'>
            {new Array(4).fill(0).map((_, index) => (
              <Skeleton key={index} className='h-12 w-24 mb-4 rounded-xs' />
            ))}
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-full rounded-xs' />
            <Skeleton className='h-4 w-full rounded-xs' />
            <Skeleton className='h-4 w-full rounded-xs' />
            <Skeleton className='h-4 w-full rounded-xs' />
            <Skeleton className='h-4 w-3/4 rounded-xs' />
          </div>
        </div>
        <Skeleton className='h-[300px] w-[200px] ml-8 rounded-xl aspect-2/3 lg:self-start' />
      </div>
    );

  if (!movie) return (
    <div className='p-10 flex items-center justify-center'>
      <p className='text-2xl font-semibold'>No movie found.</p>
    </div>
  )

  return (
    <div className='p-10 flex flex-col-reverse lg:flex-row items-center'>
      <div className='flex-1'>
        <h1 className='text-[36px] font-semibold mb-1'>{movie.title}</h1>
        <p className='mb-4 font-normal text-[rgba(64,70,84,.7)]'>{movie.director}</p>
        <div className='py-4 mb-6 border-y border-[#e1e7ea]'>
          <div className='flex max-w-[400px] gap-y-3 flex-wrap'>
            <span className='inline-flex items-center w-1/2 text-[14px] gap-1.5'>
              <FaRegStar />
              <span>{movie.rating} / 10</span>
            </span>
            <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
              <FaRegClock />
              <span>{formatTime(duration)}</span>
            </span>
            <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
              <FaMicrophone />
              <span>{movie.type}</span>
            </span>
            <span className='flex items-center w-1/2 text-[14px] gap-1.5'>
              <FaRegCalendar />
              <span>{movie.releaseYear}</span>
            </span>
          </div>
          <audio
            ref={audioRef}
            src={`${AUDIO_API}${movie.audioLink}`}
            onLoadedMetadata={onLoadedMetadata}
            className='hidden'
          />
        </div>
        <button
          onClick={handleSummarise}
          className='flex items-center justify-center cursor-pointer h-[48px] text-[16px] max-w-[280px] bg-[#320580] rounded-sm mb-6 w-full text-white'
        >
          Summarise
          <Image src='/assets/bolt.svg' alt='play' width={12} height={12} className='ml-2' />
        </button>
        <button className='flex items-center cursor-pointer text-[18px] text-[#0365f2] font-medium gap-2 mb-10'>
          <FaRegBookmark />
          Add to Favorites
        </button>
        <h2 className='text-[18px] font-semibold mb-4'>What's it about?</h2>
        <div className='flex flex-wrap gap-4 mb-4'>
          {movie.tags.map(tag => (
            <span key={tag} className='bg-[#f1f6f4] px-4 h-12 flex items-center font-medium rounded-sm'>
              {tag}
            </span>
          ))}
        </div>
        <p>{movie.movieDescription}</p>
      </div>
      <figure className='relative aspect-2/3 w-[200px] min-w-[200px] ml-8 overflow-hidden lg:self-start'>
        <Image
          src={movie.imageLink}
          alt={movie.title}
          fill
          className='object-cover rounded-xl w-full h-full'
          sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw'
          loading='eager'
        />
      </figure>
    </div>
  );
}
