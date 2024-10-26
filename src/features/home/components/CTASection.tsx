import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-secondary-foreground sm:text-4xl">
          Ready to Modernize Your Transit System?
        </h2>
        <p className="mb-10 text-xl text-muted-foreground">
          Join the SmartYatra revolution and transform your urban bus services today.
        </p>
        <Button className="w-48 py-4">
          Request a Demo <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
