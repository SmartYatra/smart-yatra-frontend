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
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
