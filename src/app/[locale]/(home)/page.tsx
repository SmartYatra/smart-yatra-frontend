import { FC } from 'react';

import BackgroundGlow from '@/components/background-glow';
import { FAQ } from '@/features/home/components/FAQ';
import { Features } from '@/features/home/components/Features';
import { Hero } from '@/features/home/components/Hero';
import { HowItWorks } from '@/features/home/components/HowItWorks';
import { Newsletter } from '@/features/home/components/NewsLetter';
import { Testimonials } from '@/features/home/components/Testimonial';
import { WhyChooseUs } from '@/features/home/components/WhyChooseUs';

/**
 * Component: HomePage
 * The landing page that includes the Hero section.
 */
const HomePage: FC = () => {
  return (
    <div aria-labelledby='home-page' className='relative overflow-hidden'>
      <Hero />
      <div className='relative'>
        <BackgroundGlow className='-right-80 bottom-[32rem] left-auto' />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
      </div>
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default HomePage;
