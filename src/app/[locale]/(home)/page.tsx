import { FC } from 'react';

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
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default HomePage;
