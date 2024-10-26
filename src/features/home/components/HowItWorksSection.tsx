import Step1Image from '@/assets/how-it-works/step1.jpeg';
import Step2Image from '@/assets/how-it-works/step2.jpeg';
import Step3Image from '@/assets/how-it-works/step3.jpeg';
import { Button } from '@/components/ui/button';

const HowItWorksSection = () => {
  return (
    <section className="my-10 py-20" id="how-it-works">
      <div className="max-container max-w-7xl text-center">
        <h2 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
        <p className="mx-auto mb-10 max-w-3xl text-muted-foreground">
          SmartYatra simplifies public transport with an intuitive approach. Here's how you can make
          the most of our services.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <img alt="Step 1: Download the App" className="h-48 rounded-lg" src={Step1Image} />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Step 1: Download the App</h3>
            <p className="text-muted-foreground">
              Get started by downloading the SmartYatra app from your app store and create an
              account.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Step 2: Choose Your Route" className="h-48 rounded-lg" src={Step2Image} />
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              Step 2: Choose Your Route
            </h3>
            <p className="text-muted-foreground">
              Input your destination and select the most efficient route from our real-time options.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img alt="Step 3: Enjoy Your Ride" className="h-48 rounded-lg" src={Step3Image} />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Step 3: Enjoy Your Ride</h3>
            <p className="text-muted-foreground">
              Experience a smooth and efficient journey with real-time tracking and contactless
              payments.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Button className="bg-primary text-primary-foreground hover:bg-secondary" size="lg">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
