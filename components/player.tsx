'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { useRef, useState, useEffect, useCallback } from 'react';

import { AUDIO_API, formatTime } from '@/lib/utils';


export const Player = ({ movie }: { movie: Movie }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const playAnimationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [timeProgress, setTimeProgress] = useState<number>(0);

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.duration !== undefined) {
      setDuration(audio.duration);

      if (sliderRef.current) {
        sliderRef.current.max = audio.duration.toString();
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      updateProgress();
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      updateProgress();
    }
  };

  const handleProgressChange = () => {
    if (audioRef.current && sliderRef.current) {
      const newTime = Number(sliderRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);
      // if progress bar changes while audio is on pause
      sliderRef.current.style.setProperty('--range-progress', `${(newTime / duration) * 100}%`);
    }
  };

  const updateProgress = useCallback(() => {
    if (audioRef.current && sliderRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      sliderRef.current.value = currentTime.toString();
      sliderRef.current.style.setProperty('--range-progress', `${(currentTime / duration) * 100}%`);
    }
  }, [duration, setTimeProgress, audioRef, sliderRef]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && sliderRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, sliderRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

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
        <button onClick={handleBackward} className='cursor-pointer'>
          <FaBackward />
        </button>
        <button
          onClick={handlePlay}
          className='w-10 h-10 bg-white rounded-full cursor-pointer text-black flex items-center justify-center'
        >
          {isPlaying ? <FaPause className='text-black' /> : <FaPlay className='text-black' />}
        </button>
        <button onClick={handleForward} className='cursor-pointer'>
          <FaForward />
        </button>
      </div>
      <div className='flex gap-3 w-[calc(100%/3)] items-center'>
        <span className='w-8 text-[14px] mr-2'>{formatTime(timeProgress)}</span>
        <input
          ref={sliderRef}
          type='range'
          min={0}
          defaultValue={0}
          onChange={handleProgressChange}
          className='max-w-[300px] w-full h-0.5 cursor-pointer appearance-none'
        />
        <span className='w-8 text-[14px]'>{formatTime(duration)}</span>
      </div>
      <audio
        ref={audioRef}
        src={`${AUDIO_API}${movie.audioLink}`}
        onLoadedMetadata={onLoadedMetadata}
        className='hidden'
      />
    </div>
  );
};
