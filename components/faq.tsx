import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQSection = () => {
  return (
    <Accordion type='single' collapsible className='w-full space-y-2 pb-10'>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='text-[18px] lg:text-[20px] cursor-pointer'>What is Hollywood AI?</AccordionTrigger>
        <AccordionContent className='text-[14px] lg:text-base text-[#6b7280]'>
          <p>
            HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without
            breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in
            just minutes instead of hours.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger className='text-[18px] lg:text-[20px] cursor-pointer'>How much does Hollywood AI cost?</AccordionTrigger>
        <AccordionContent className='text-[14px] lg:text-base text-[#6b7280]'>
          <p>
            Get summaries of your favourite movies on your smartphone, tablet or laptop, all for one fixed monthly or
            yearly fee. Plans range from $19 per month to $190 per year. No extra costs, no contracts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger className='text-[18px] lg:text-[20px] cursor-pointer'>What can I watch on Hollywood AI?</AccordionTrigger>
        <AccordionContent className='text-[14px] lg:text-base text-[#6b7280]'>
          <p>
            Hollywood AI has an extensive library of feature films. Watch as much as you want, at any time that you
            want.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
