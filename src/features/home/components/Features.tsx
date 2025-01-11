'use client';

import React from 'react';

import { Bus, HandCoins, Languages, QrCode } from 'lucide-react';

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

const features = [
  {
    title: 'QR Code-Based Bus Tracking',
    description:
      'Easily track your journey by scanning a unique QR code on each bus, ensuring a seamless travel experience.',
    icon: QrCode,
  },
  {
    title: 'Automatic Fare Deduction',
    description:
      'Say goodbye to cash payments. SmartYatra calculates your travel fare and deducts it automatically based on your journey.',
    icon: HandCoins,
  },
  {
    title: 'Real-Time Bus Management',
    description:
      'Empowering drivers and operators with tools to manage routes, schedules, and passenger information in real-time.',
    icon: Bus,
  },
  {
    title: 'Multi-Language Support',
    description:
      'SmartYatra supports multiple languages, including English and Nepali, ensuring accessibility for all users.',
    icon: Languages,
  },
];

export const Features = () => {
  return (
    <SectionWrapper className='pt-40' id='features'>
      <SectionSubtitle>Features</SectionSubtitle>
      <SectionTitle>SmartYatra Features</SectionTitle>
      <SectionDescription>
        Discover the key features that make SmartYatra stand out.
      </SectionDescription>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((feature, index) => (
          <Card className='p-6' key={index}>
            <CardHeader className='flex flex-col items-center'>
              <feature.icon size={48} />
              <CardTitle className='text-xl font-semibold'>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='text-muted-foreground'>
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};
