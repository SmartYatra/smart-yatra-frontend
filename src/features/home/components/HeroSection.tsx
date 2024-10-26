import { Link } from 'react-router-dom';

import { HoverBorderGradient } from '@/components/HoverBorderGradient';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

const HeroSection = () => {
  return (
    <div className="max-container h-[70vh]">
      <div className="flex size-full flex-col items-center justify-center">
        <div className="z-0 mt-48 flex flex-col justify-center max-xl:items-center">
          <HoverBorderGradient
            className="w-fit cursor-auto rounded-full px-4 py-1 text-xs"
            containerClassName="mb-2"
          >
            🌟 Experience the Next-Gen Transit
          </HoverBorderGradient>
          <h1 className="mb-6 text-center text-5xl font-extrabold tracking-tight text-secondary-foreground sm:text-6xl lg:text-7xl">
            The Future of Urban Transit is Here
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-center text-xl text-muted-foreground sm:text-xl">
            SmartYatra revolutionizes public transportation with real-time tracking, route
            optimization, and seamless payments.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to={ROUTES.SIGN_UP}>
              <Button className="w-40 py-4">
                <span>Get Started</span>
              </Button>
            </Link>
            <Link to={ROUTES.FEATURES}>
              <Button className="w-40 py-4" variant="outline">
                <span>View Demo</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
