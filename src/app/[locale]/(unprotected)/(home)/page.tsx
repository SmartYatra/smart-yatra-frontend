import { FC } from 'react';

import BackgroundGlow from '@/components/background-glow';

import {
  FAQ,
  Features,
  Hero,
  HowItWorks,
  Newsletter,
  Testimonials,
  WhyChooseUs,
} from './_components';

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
