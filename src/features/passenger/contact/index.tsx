import { Helmet } from 'react-helmet-async';

import BusOnRoadImg from '@/assets/bus-on-road.jpg';
import { Footer, Header } from '@/components/layout';

import { ContactForm, ContactInformation } from './components';

export const Contact = () => (
  <>
    <Helmet>
      <title>Contact SmartYatra - Get in Touch</title>
      <meta
        content="Contact SmartYatra for support, feedback, or partnership inquiries"
        name="description"
      />
    </Helmet>
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative bg-gradient-to-r from-primary to-primary-foreground py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-center text-4xl font-bold">Contact Us</h1>
            <p className="mx-auto max-w-3xl text-center text-xl">
              We're here to help! Reach out to us for support, feedback, or partnership inquiries.
            </p>
          </div>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt="City skyline"
              className="pointer-events-none size-full object-cover object-top opacity-20"
              src={BusOnRoadImg}
            />
          </div>
        </div>

        <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <ContactInformation />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);
