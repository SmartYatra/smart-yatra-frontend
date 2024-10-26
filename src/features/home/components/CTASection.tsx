import { Link } from 'react-router-dom';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-accent/20 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-3 text-3xl font-bold text-secondary-foreground sm:text-4xl">
          Ready to Modernize Your Transit System?
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          Join the SmartYatra revolution and transform your urban bus services today.
        </p>
        <Link to="/sign-up">
          <Button className="w-40 py-4">
            <span>Get Started</span>
            <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
