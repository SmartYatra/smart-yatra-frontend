import { Helmet } from 'react-helmet-async';

import { Bus, Clock, MapPin, Users } from 'lucide-react';

import BusOnRoadImg from '@/assets/bus-on-road.jpg';
import { Footer, Header } from '@/components/layout';

import AboutCTA from './components/AboutCTA';
import AboutHeader from './components/AboutHeader';
import FeatureCard from './components/FeatureCard';
import ImpactStat from './components/ImpactStat';
import MissionVisionTabs from './components/MissionVisionTabs';

export default function About() {
  const features = [
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Get live updates on bus locations and estimated arrival times.',
    },
    {
      icon: MapPin,
      title: 'Route Planning',
      description: 'Plan your journey with our intelligent route suggestions.',
    },
    {
      icon: Bus,
      title: 'Multi-Modal Integration',
      description: 'Seamlessly combine bus, metro, and other transport modes.',
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Benefit from crowd-sourced information and user feedback.',
    },
  ];

  const stats = [
    { value: '1M+', label: 'Daily Users' },
    { value: '50%', label: 'Reduced Wait Times' },
    { value: '30%', label: 'Lower CO2 Emissions' },
  ];

  return (
    <>
      <Helmet>
        <title>About SmartYatra - Public Transport Digitization System</title>
        <meta
          content="Learn about SmartYatra and our mission to revolutionize public transport"
          name="description"
        />
      </Helmet>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">
          <AboutHeader
            backgroundImage={BusOnRoadImg}
            description="Revolutionizing public transportation through digital innovation, making commuting easier, faster, and more efficient for everyone."
            title="About SmartYatra"
          />

          <div className="mx-auto mt-12 max-w-7xl">
            <MissionVisionTabs />

            <h2 className="mb-8 text-center text-3xl font-bold">Why Choose SmartYatra?</h2>
            <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  description={feature.description}
                  icon={feature.icon}
                  title={feature.title}
                />
              ))}
            </div>

            <div className="mb-12 rounded-lg bg-muted p-8">
              <h2 className="mb-4 text-center text-3xl font-bold">Our Impact</h2>
              <div className="mx-auto grid max-w-7xl gap-6 text-center sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <ImpactStat key={index} label={stat.label} value={stat.value} />
                ))}
              </div>
            </div>

            <AboutCTA />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
