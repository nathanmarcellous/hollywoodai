'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaUser } from 'react-icons/fa6';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const LoginModal = ({
  onSwitchToForgot,
  onSwitchToSignup,
}: {
  onSwitchToForgot: () => void;
  onSwitchToSignup: () => void;
}) => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to login');
    }

  };

  return (
    <div className='flex flex-col items-center h-full'>
      <h2
        className='text-[32px] font-extrabold text-[#1f2328] text-center mt-1 mb-3'
        onClick={() => console.log('h2 clicked')}
      >
        Log In
      </h2>
      <div className='flex flex-col gap-3 p-2 w-full'>
        <button className='flex justify-start items-center gap-3 rounded-lg font-medium text-[#404654] border-3 border-[#ebebeb] py-3 px-5 text-[14px]'>
          <FcGoogle /> Login with Google
        </button>
        <button className='flex justify-start items-center gap-3 rounded-lg font-medium text-[#404654] border-3 border-[#ebebeb] py-3 px-5 text-[14px]'>
          <FaUser size={16} /> Login as Guest
        </button>
      </div>
      <div className='flex my-6 items-center gap-8 w-full'>
        <div className='h-px flex-1 bg-[#ebebeb]'></div>
        <span className='text-[#404654] text-[14px]'>or</span>
        <div className='h-px flex-1 bg-[#ebebeb]'></div>
      </div>
      <div className='w-full px-2'>
        <form className='flex flex-col gap-4 w-ful' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 w-full '>
            <label htmlFor='email' className='text-[13px] font-medium text-[#667085]'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              className='w-full rounded-lg h-11 border border-[#ebebeb] px-4 py-2 text-[14px] text-[#404654] outline-none'
              name='email'
              required
            />
          </div>
          <div className='flex flex-col gap-3 w-full '>
            <label htmlFor='password' className='text-[13px] font-medium text-[#667085]'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='w-full rounded-lg h-11 border border-[#ebebeb] px-4 py-2 text-[14px] text-[#404654] outline-none'
              name='password'
              required
            />
          </div>
          <span className='text-[13px] cursor-pointer text-[#4f46e5] w-fit ml-auto' onClick={onSwitchToForgot}>
            Forgot password?
          </span>
          <button
            type='submit'
            className='bg-[#320580] rounded-4xl font-medium text-white h-11 w-full text-[15px] flex items-center justify-center border-none px-5 cursor-pointer'
          >
            Log In
          </button>
        </form>
        <div className='text-center text-[13px] mt-5'>
          Don&apos;t have an account?{' '}
          <span className='text-[#4f46e5] cursor-pointer underline' onClick={onSwitchToSignup}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};
