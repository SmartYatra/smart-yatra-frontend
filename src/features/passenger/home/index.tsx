import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Bus, MapPin, Search } from 'lucide-react';

import { Footer, Header } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Helmet>
        <title>SmartYatra - Public Transport Digitization System</title>
        <meta content="Home Page of SmartYatra" name="description" />
      </Helmet>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex size-full flex-1 items-center">
          <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="mb-4 text-center text-4xl font-bold">Welcome to SmartYatra</h1>
              <p className="text-center text-xl text-muted-foreground">
                Real-time public transport information at your fingertips
              </p>
            </div>
            <div className="mb-8">
              <div className="relative">
                <Input
                  className="w-full rounded-lg py-5 pl-10 pr-4"
                  placeholder="Search for routes or buses"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <Search className="text-muted- absolute left-3 top-1/2 size-5 -translate-y-1/2 transform" />
              </div>
            </div>
            <div className="mb-8 overflow-hidden rounded-lg bg-muted shadow-lg">
              <div className="aspect-w-16 aspect-h-9">
                {/* Placeholder for the map */}
                <div className="flex h-full min-h-72 w-full items-center justify-center bg-muted-foreground/10">
                  <MapPin className="h-16 w-16 text-muted-foreground" />
                  <span className="sr-only">Map showing real-time bus locations</span>
                </div>
              </div>
            </div>
            <Link className="flex w-full items-center justify-center" to={ROUTES.SIGN_IN}>
              <Button className="bg-primary text-primary-foreground" size="lg">
                <Bus className="mr-2 h-5 w-5" /> Login / Sign Up
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
