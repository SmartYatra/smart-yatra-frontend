'use client';

import { useState } from 'react';

import { Check, Star } from 'lucide-react';

import { SectionTitle } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type PricingPlan = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  isPopular?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: 'BASIC',
    price: {
      monthly: 19,
      yearly: 190,
    },
    description:
      'For individual developers and small teams starting with reusable components.',
    features: [
      'Access to Basic Components',
      'React & Next.js Support',
      'Limited Documentation',
      'Community Support',
      'Standard Performance',
    ],
  },
  {
    name: 'PRO',
    price: {
      monthly: 49,
      yearly: 490,
    },
    description:
      'Ideal for professional developers looking to scale with advanced utilities.',
    features: [
      'Access to All Components & Hooks',
      'React & Next.js + Tailwind Support',
      'Comprehensive Documentation',
      'Priority Support',
      'Optimized Performance',
      'Advanced Performance Optimizations',
    ],
    isPopular: true,
  },
  {
    name: 'ENTERPRISE',
    price: {
      monthly: 99,
      yearly: 990,
    },
    description:
      'For teams and companies needing custom components and full support.',
    features: [
      'Custom Components & Integrations',
      'Tailwind + Next.js Support',
      'Enterprise-level Documentation',
      '24/7 Premium Support',
      'Unlimited Team Access',
      'Priority Performance Optimizations',
    ],
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <SectionTitle>Pricing</SectionTitle>
          <h3 className='mb-8 text-4xl font-bold'>
            Choose the plan that suits your project needs
          </h3>
          <div className='flex items-center justify-center gap-4'>
            <span
              className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className='mx-auto grid max-w-6xl gap-3 md:grid-cols-3'>
          {plans.map(plan => (
            <Card
              key={plan.name}
              className={cn('relative flex flex-col justify-between', {
                'z-10 min-h-[500px] scale-110 border-primary shadow-lg':
                  plan.isPopular,
              })}
            >
              {plan.isPopular && (
                <div className='absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground'>
                  <Star className='h-3 w-3 fill-current' />
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className='text-lg'>{plan.name}</CardTitle>
                <div className='mt-4'>
                  <span className='text-5xl font-bold'>
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className='ml-2 text-muted-foreground'>
                    / {isYearly ? 'year' : 'month'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-2'>
                  {plan.features.map(feature => (
                    <div className='flex items-center gap-2' key={feature}>
                      <Check className='h-4 w-4 text-primary' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex flex-col gap-4'>
                <Button
                  className='w-full'
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  Subscribe
                </Button>
                <CardDescription className='text-center text-sm'>
                  {plan.description}
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
