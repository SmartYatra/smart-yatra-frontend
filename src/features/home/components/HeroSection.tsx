import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

const HeroSection = () => {
  return (
    <header>
      <div className="max-container py-32">
        <h1 className="mb-6 text-center text-5xl font-extrabold tracking-tight text-primary sm:text-6xl lg:text-7xl">
          The Future of Urban Transit is Here
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-center text-xl text-secondary sm:text-xl">
          SmartYatra revolutionizes public transportation with real-time tracking, route
          optimization, and seamless payments.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to={ROUTES.SIGN_UP}>
            <Button className="w-40 py-4">Get Started</Button>
          </Link>
          <Link to={ROUTES.FEATURES}>
            <Button className="w-40 py-4" variant="outline">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
