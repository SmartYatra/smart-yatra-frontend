import { Link } from 'react-router-dom';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

const AboutCTA = () => {
  return (
    <div className="mx-auto mb-12 max-w-7xl text-center">
      <h2 className="mb-4 text-3xl font-bold">Join the SmartYatra Revolution</h2>
      <p className="mx-auto mb-6 max-w-3xl text-xl text-muted-foreground">
        Be part of the movement to make public transportation smarter, more efficient, and
        environmentally friendly...
      </p>
      <Link to={ROUTES.HOME}>
        <Button className="group bg-primary text-primary-foreground" size="lg">
          Get Started
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default AboutCTA;
