import { BackgroundBeams } from '@/components/BackgroundBeams';

import {
  CTASection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
} from './components';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative">
        <BackgroundBeams />
        <Header />
        <HeroSection />
      </div>

      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
