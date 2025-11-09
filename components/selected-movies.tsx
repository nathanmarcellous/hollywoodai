'use client';

import { Movie } from '@/types';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import { MovieCard } from './movie-card';

export const SelectedMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const fetchSelectedMovies = async () => {
      const { data } = await axios.get('https://advanced-internship-api-production.up.railway.app/selectedMovies');
      setSelectedMovies(data.data);
      setLoading(false);
    };
    fetchSelectedMovies();
  }, []);

  return (
    <section className='pt-10 px-8 max-w-[1400px] mx-auto'>
      <h2 className='font-bold text-[22px]'>Selected just for you</h2>
      <p className='text-[14px] mt-1 mb-4 text-[rgba(64,70,84,.7)]'>We think you'll like these.</p>
      <div className='flex'>
        <div className='embla' ref={emblaRef}>
          {loading ? (
            <div className='embla__container'>
              {new Array(12).fill(0).map((_, index) => (
                <div key={index} className='embla__slide'>
                  <MovieCard.Skeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className='embla__container'>
                {selectedMovies.map(movie => (
                  <div key={movie.id} className='embla__slide'>
                    <MovieCard movie={movie} />
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
