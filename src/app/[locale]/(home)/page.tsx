import { FC } from 'react';

import { FAQ } from '@/app/[locale]/(home)/_components/FAQ';
import { Features } from '@/app/[locale]/(home)/_components/Features';
import { Hero } from '@/app/[locale]/(home)/_components/Hero';
import { HowItWorks } from '@/app/[locale]/(home)/_components/HowItWorks';
import { Newsletter } from '@/app/[locale]/(home)/_components/NewsLetter';
import { Testimonials } from '@/app/[locale]/(home)/_components/Testimonial';
import { WhyChooseUs } from '@/app/[locale]/(home)/_components/WhyChooseUs';
import BackgroundGlow from '@/components/background-glow';

/**
 * Component: HomePage
 * The landing page that includes the Hero section.
 */
const HomePage: FC = () => {
  return (
    <div aria-labelledby='home-page' className='relative'>
      <Hero />
      <div className='relative'>
        {/* <BackgroundGlow className='-right-80 bottom-[32rem] left-auto' /> */}
        <BackgroundGlow position={'right'} size={'lg'} />
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
