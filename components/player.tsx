'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import { FaBackward, FaForward, FaPlay } from 'react-icons/fa';

import { useRef, useState, useEffect } from 'react';

const audioApi = 'https://advanced-internship-api-production.up.railway.app/';


export const Player = ({ movie }: { movie: Movie }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
  };

  const updateProgress = (input: HTMLInputElement) => {
    const min = Number(input.min) || 0;
    const max = Number(input.max) || 100;
    const value = Number(input.value);
    const percent = ((value - min) * 100) / (max - min);
    input.style.setProperty('--progress', `${percent}%`);

    console.log(percent);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (sliderRef.current) {
      updateProgress(sliderRef.current);
    }
  }, [movie]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProgress(event.currentTarget);
  };


  return (
    <div className='fixed bottom-0 left-0 h-20 w-full bg-[#042330] z-50 px-10 flex items-center justify-between text-white'>
      <div className='flex gap-3 w-[calc(100%/3)]'>
        <figure className='flex max-h-12 h-12 min-h-12 w-8 relative'>
          <Image src={movie.imageLink} alt={movie.title} fill className='object-cover w-full h-full' />
        </figure>
        <div className=' text-[14px] gap-0.5 flex flex-col justify-center'>
          <p>{movie.title}</p>
          <p className='text-[#bac8ce]'>{movie.director}</p>
        </div>
      </div>
      <div className='flex items-center justify-center gap-3 w-[calc(100%/3)]'>
        <button className='cursor-pointer'>
          <FaBackward />
        </button>
        <button
          onClick={handlePlay}
          className='w-10 h-10 bg-white rounded-full cursor-pointer text-black flex items-center justify-center'
        >
          <FaPlay className='text-black' />
        </button>
        <button className='cursor-pointer'>
          <FaForward />
        </button>
      </div>
      <div className='flex gap-3 w-[calc(100%/3)] items-center'>
        <span className='w-8 text-[14px] mr-2'>00:00</span>
        <input
          ref={sliderRef}
          type='range'
          min={0}
          max={100}
          defaultValue={0}
          onChange={handleInput}
          className='max-w-[300px] w-full h-0.5 cursor-pointer appearance-none'
        />
        <span className='w-8 text-[14px]'>03:34</span>
      </div>
      <audio
        ref={audioRef}
        src={`${audioApi}${movie.audioLink}`}
        onLoadedMetadata={onLoadedMetadata}
        className='hidden'
      />
    </div>
  );
};
