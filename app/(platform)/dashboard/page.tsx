import { SelectedMovies } from '@/components/selected-movies';
import { TopMovies } from '@/components/top-movies';

export default function Dashboard() {
  return (
    <>
      <div className='w-full border-b border-[#f1f3f4]'>
        <div className='max-w-[1400px] mx-auto py-6 px-8 '>
          <h1 className='text-[33px] font-bold'>AI Movie Summariser</h1>
          <p className='text-[rgba(64,70,84,.7)] text-[14px]'>
            Enjoy high-quality summaries of your favourite movies instantly without breaking a sweat.
          </p>
        </div>
      </div>
      <SelectedMovies />
      <TopMovies />
    </>
  );
}
