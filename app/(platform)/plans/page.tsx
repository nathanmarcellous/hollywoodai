import { Check } from 'lucide-react';

import { FAQSection } from '@/components/faq';

export default function Plans() {
  return (
    <>
      <div className='w-full border-b border-[#f1f3f4]'>
        <div className='max-w-[1400px] mx-auto py-6 px-8 '>
          <h1 className='text-[33px] font-bold'>Plans</h1>
          <p className='text-[rgba(64,70,84,.7)] text-[14px]'>
            Get unlimited access to our extensive library of movie summaries.
          </p>
        </div>
      </div>
      <div className='max-w-[1400px] mx-auto py-6 px-8 '>
        <h2 className='text-[26px] font-bold mb-5'>Subscription Plans:</h2>
        <div className='flex gap-3 md:flex-row flex-col'>
          <div className='md:w-1/2 w-full flex flex-col p-7 shadow-[0_7px_20px_rgba(0,0,0,.04)] rounded-xl border border-[#f1f3f4]'>
            <div className='mb-2 flex items-start text-[50px] font-bold leading-none gap-1'>
              <span className='text-[18px] font-normal'>$</span>
              <h3>19</h3>
              <span className='text-[15px] font-medium ml-1 mt-2'>Monthly</span>
            </div>
            <div className='text-[15px] font-medium leading-none opacity-50 mb-2'>Premium</div>
            <div className='my-6'>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>Premium Support</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>Access 100+ Summaries</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>Higher Quality Audio</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>License For Commercial Use</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>2 Supported Devices</p>
              </div>
            </div>
            <button className='mt-[60px] text-[14px] font-medium py-2 px-4 rounded-4xl bg-[#320580] text-white flex items-center justify-center w-full h-11 shadow-[0 2px 6px rgba(0, 0,0,.1)]'>
              Choose Plan
            </button>
          </div>

          <div className='md:w-1/2 w-full flex flex-col p-7 shadow-[0_7px_20px_rgba(0,0,0,.04)] rounded-xl border border-[#f1f3f4]'>
            <div className='mb-2 flex items-start text-[50px] font-bold leading-none gap-1'>
              <span className='text-[18px] font-normal'>$</span>
              <h3>190</h3>
              <span className='text-[15px] font-medium ml-1 mt-2'>Yearly</span>
            </div>
            <div className='text-[15px] font-medium leading-none opacity-50 mb-2'>VIP+</div>
            <div className='my-6'>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>2 Months Free</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>Access 100+ Summaries</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>Highest Quality Audio</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>License For Commercial Use</p>
              </div>
              <div className='flex gap-2 mb-3'>
                <div className='w-5 h-5 flex items-center justify-center text-[#320580] bg-[rgba(50,5,128,.1)] rounded-full'>
                  <Check className='size-4' />
                </div>
                <p className='text-[14px] md:text-base'>3 Supported Devices</p>
              </div>
            </div>
            <button className='mt-[60px] text-[14px] font-medium py-2 px-4 rounded-4xl bg-[#320580] text-white flex items-center justify-center w-full h-11 shadow-[0 2px 6px rgba(0, 0,0,.1)]'>
              Choose Plan
            </button>
          </div>
        </div>
      </div>
      
      <div className='max-w-[1400px] mx-auto px-8 '>
        <FAQSection />
      </div>
    </>
  );
}
