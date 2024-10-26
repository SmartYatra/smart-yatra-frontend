import Feature1 from '@/assets/about/feature1.png';
import Feature2 from '@/assets/about/feature2.png';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">About SmartYatra</h2>
        <p className="mx-auto mb-10 max-w-3xl text-muted-foreground">
          SmartYatra is revolutionizing urban transit, providing seamless solutions for real-time
          tracking, optimized routes, and hassle-free fare payments. Discover how we make public
          transport smarter.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="rounded-xl bg-primary/5 p-3">
              <img
                alt="Real-time tracking"
                className="rounded-xl"
                height={200}
                src={Feature1}
                width={350}
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Get live updates on bus locations and estimated arrival times to plan your trips
              better.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-xl bg-primary/5 p-3">
              <img
                alt="Contactless payments"
                className="rounded-xl"
                height={200}
                src={Feature2}
                width={350}
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">Contactless Payments</h3>
            <p className="text-muted-foreground">
              Secure, convenient QR-based payment system for passengers and drivers.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Button className="bg-primary text-primary-foreground hover:bg-secondary" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
