'use client';

import { Movie } from '@/types';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaRegClock, FaRegStar } from 'react-icons/fa';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

export const TopMovies = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const fetchSelectedMovies = async () => {
      const { data } = await axios.get('https://advanced-internship-api-production.up.railway.app/topMovies');
      setTopMovies(data.data);
      setLoading(false);
    };
    fetchSelectedMovies();
  }, []);

  return (
    <section className='pt-10 px-8 max-w-[1400px] mx-auto'>
      <h2 className='font-bold text-[22px]'>Top Movies</h2>
      <p className='text-[14px] mt-1 mb-4 text-[rgba(64,70,84,.7)]'>Enjoy our highest rated films.</p>
      <div className='flex'>
        <div className='embla' ref={emblaRef}>
          {loading ? (
            <div className='embla__container'>
              {new Array(12).fill(0).map((_, index) => (
                <div key={index} className='embla__slide'>
                  <figure className='aspect-2/3 mb-2.5 relative h-full w-full'>
                    <Skeleton className='w-full h-full rounded-lg' />
                  </figure>
                  <div>
                    <Skeleton className='w-full h-2 mb-1.5' />
                    <Skeleton className='w-1/2 h-2 mb-1.5' />
                    <Skeleton className='w-4/5 h-2 mb-1' />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className='embla__container'>
                {topMovies.map(movie => (
                  <div key={movie.id} className='embla__slide'>
                    <Link href={`/movie/${movie.id}`} className='cursor-pointer'>
                      <figure className='aspect-2/3 mb-1 relative h-full w-full'>
                        <Image
                          src={movie.imageLink}
                          alt={movie.title}
                          className='w-full h-full object-cover rounded-lg'
                          fill
                        />
                        {movie.subscriptionRequired && (
                          <div className='absolute -top-2.5 bg-[rgba(50,5,128,.767)] rounded-xl text-[10px] font-light left-1/2 translate-x-[-50%] text-white z-20 py-[3px] px-2.5'>
                            Premium
                          </div>
                        )}
                      </figure>
                      <div>
                        <p className='text-[14px] font-bold mb-0.5'>{movie.title}</p>
                        <p className='text-[12px] text-[rgba(64,70,84,.7)] font-light mb-0.5'>{movie.director}</p>
                        <div className='flex items-center gap-2'>
                          <span className='text-[12px] text-[rgba(64,70,84,.7)] flex items-center gap-1'>
                            <FaRegClock />
                            21:21
                          </span>
                          <span className='text-[12px] text-[rgba(64,70,84,.7)] flex items-center gap-1'>
                            <FaRegStar />
                            {movie.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
