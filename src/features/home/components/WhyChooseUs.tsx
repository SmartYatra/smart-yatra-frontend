'use client';

import Image from 'next/image';

import { DollarSign, MapPin, Smile, Zap } from 'lucide-react';

import WhyChooseUsImg from '@/assets/why-choose-us.svg';
import {
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
} from '@/components/PageWrapper';

export function WhyChooseUs() {
  const benefits = [
    {
      title: 'Efficient and Automated',
      description:
        'Reduce manual tasks with automated fare calculation and seamless journey tracking.',
      icon: Zap,
    },
    {
      title: 'Real-Time Monitoring',
      description:
        'Track buses and passenger activity in real-time for better decision-making.',
      icon: MapPin,
    },
    {
      title: 'Cost-Effective Solution',
      description:
        'Cut down on operational costs and streamline transit operations.',
      icon: DollarSign,
    },
    {
      title: 'User-Friendly Design',
      description: 'SmartYatra is intuitive for both passengers and operators.',
      icon: Smile,
    },
  ];

  return (
    <SectionWrapper className='text-left' id='why-choose-us'>
      <div className='flex flex-col gap-8 lg:flex-row'>
        {/* Benefits Section */}
        <div className='flex-1 space-y-16'>
          <div>
            <SectionSubtitle>Why Choose SmartYatra</SectionSubtitle>
            <SectionTitle>Why Choose SmartYatra?</SectionTitle>
            <SectionDescription>
              Discover the benefits of revolutionizing public transport.
            </SectionDescription>
          </div>
          <div className='space-y-6'>
            {benefits.map((benefit, index) => (
              <div className='flex items-start gap-4' key={index}>
                <div className='flex-shrink-0'>
                  <benefit.icon className='h-10 w-10 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>{benefit.title}</h3>
                  <p className='text-muted-foreground'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration/Graphic Section */}
        <div className='flex-1'>
          <Image
            alt='Why Choose Us Illustration'
            height={400}
            src={WhyChooseUsImg}
            width={600}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
