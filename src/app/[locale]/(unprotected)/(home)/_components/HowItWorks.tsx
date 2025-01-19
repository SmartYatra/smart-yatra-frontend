'use client';

import { HandCoins, Map, QrCode, UserPlus } from 'lucide-react';

import {
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
} from '@/components/page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function HowItWorks() {
  const steps = [
    {
      title: 'Register and Get Your QR Code',
      description:
        'Bus drivers register their buses to automatically generate a unique QR code.',
      icon: UserPlus,
    },
    {
      title: 'Scan the QR Code',
      description:
        'Passengers scan the QR code upon entering and exiting the bus to log their journey.',
      icon: QrCode,
    },
    {
      title: 'Automatic Fare Deduction',
      description:
        'The system calculates the fare based on travel distance and deducts it automatically.',
      icon: HandCoins,
    },
    {
      title: 'Track Your Journey',
      description:
        'Both passengers and operators can monitor real-time trip and payment details.',
      icon: Map,
    },
  ];

  return (
    <SectionWrapper id='how-it-works'>
      <SectionSubtitle>How It Works</SectionSubtitle>
      <SectionTitle>How SmartYatra Works</SectionTitle>
      <SectionDescription>
        A seamless way to enhance your public transport experience.
      </SectionDescription>

      <div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-col items-center'>
              <step.icon className='mb-4 h-16 w-16 text-primary' />
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
