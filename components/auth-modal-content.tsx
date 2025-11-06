'use client';

import { auth } from '@/firebase';
import { useDialog } from '@/hooks/use-dialog';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export const AuthModalContent = () => {
  const { onClose } = useDialog();
  const [modalType, setModalType] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleModalType = (type: 'login' | 'signup' | 'forgotPassword') => {
    setModalType(type);
    setError(null);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      onClose();
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      onClose();
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setError(null);
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert(`A Password Reset Link has been sent to ${email}`);
      setLoading(false);
      onClose();
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLoginGuest = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, 'test@test.com', 'password123');
      setLoading(false);
      onClose();
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
      setLoading(false);
      onClose();
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    switch (modalType) {
      case 'login':
        handleLogin(email, password);
        return;
      case 'signup':
        handleSignup(email, password);
        return;
      case 'forgotPassword':
        handleForgotPassword(email);
        return;
    }
  };

  return (
    <div className='flex flex-col items-center h-full'>
      <h2 className='text-[32px] font-extrabold text-[#1f2328] text-center mt-1 mb-3'>
        {modalType === 'login' ? 'Log In' : modalType === 'signup' ? 'Sign Up' : 'Reset Password'}
      </h2>
      {error && <p className='text-[14px] mb-2 text-[#f56c6c] w-full pl-2'>{error}</p>}
      {modalType !== 'forgotPassword' && (
        <>
          <div className='flex flex-col gap-3 p-2 w-full'>
            <button
              className='flex justify-start items-center gap-3 rounded-lg font-medium text-[#404654] border-3 border-[#ebebeb] py-3 px-5 text-[14px] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
              onClick={handleLoginWithGoogle}
            >
              <FcGoogle size={16} /> Login with Google
            </button>
            <button
              className='flex justify-start items-center gap-3 rounded-lg font-medium text-[#404654] border-3 border-[#ebebeb] py-3 px-5 text-[14px] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
              onClick={handleLoginGuest}
            >
              <FaUser size={16} /> Login as Guest
            </button>
          </div>
          <div className='flex my-6 items-center gap-8 w-full'>
            <div className='h-px flex-1 bg-[#ebebeb]'></div>
            <span className='text-[#404654] text-[14px]'>or</span>
            <div className='h-px flex-1 bg-[#ebebeb]'></div>
          </div>
        </>
      )}
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
          {modalType !== 'forgotPassword' && (
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
          )}
          {modalType === 'login' && (
            <span
              className='text-[13px] cursor-pointer text-[#4f46e5] w-fit ml-auto'
              onClick={() => handleModalType('forgotPassword')}
            >
              Forgot password?
            </span>
          )}
          <button
            type='submit'
            className='bg-[#320580] rounded-4xl font-medium text-white h-11 w-full text-[15px] flex items-center justify-center border-none px-5 cursor-pointer'
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : modalType === 'login' ? (
              'Log In'
            ) : modalType === 'signup' ? (
              'Sign Up'
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        {modalType === 'login' && (
          <div className='text-center text-[13px] mt-5'>
            Don&apos;t have an account?{' '}
            <span className='text-[#4f46e5] cursor-pointer underline' onClick={() => handleModalType('signup')}>
              Sign up
            </span>
          </div>
        )}

        {modalType === 'signup' && (
          <div className='text-center text-[13px] mt-5'>
            Already have an account?{' '}
            <span className='text-[#4f46e5] cursor-pointer underline' onClick={() => handleModalType('login')}>
              Log in
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
