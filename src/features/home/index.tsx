import { BackgroundBeams } from '@/components/BackgroundBeams';

import {
  AboutSection,
  CTASection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
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
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
