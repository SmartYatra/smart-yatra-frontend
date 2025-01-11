'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AppleImg from '@/assets/apple.svg';
import BackgroundGlow from '@/components/BackgroundGlow';
import { SectionTitle } from '@/components/PageWrapper';

export function TrustedBy() {
  const t = useTranslations('HomePage.trustedBy');

  // Combine all logos into a single array
  const logos = [
    { name: t('logos.apple'), src: AppleImg },
    { name: t('logos.oracle'), src: AppleImg },
    { name: t('logos.tiktok'), src: AppleImg },
    { name: t('logos.intel'), src: AppleImg },
    { name: t('logos.ibm'), src: AppleImg },
    { name: t('logos.americanAirlines'), src: AppleImg },
    { name: t('logos.deloitte'), src: AppleImg },
    { name: t('logos.gm'), src: AppleImg },
    { name: t('logos.ey'), src: AppleImg },
    { name: t('logos.nestle'), src: AppleImg },
    { name: t('logos.bosch'), src: AppleImg },
    { name: t('logos.decathlon'), src: AppleImg },
  ];

  return (
    <section className='relative mb-20 py-32'>
      <BackgroundGlow className='-right-40 bottom-0 left-auto size-[800px] bg-gradient-to-bl from-tertiary/30 to-transparent' />

      <div className='container mx-auto px-4 text-center'>
        <SectionTitle>Trusted By</SectionTitle>
        <h2 className='mx-auto mb-16 max-w-2xl text-xl font-medium'>
          {t('heading')}
        </h2>

        <div className='relative w-full'>
          {/* Gradient overlays */}
          {/* <div className='absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent' />
          <div className='absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent' /> */}

          {/* Marquee container */}
          <div className='flex overflow-hidden'>
            {/* First set of logos */}
            <div className='flex animate-marquee items-center gap-8'>
              {logos.map(logo => (
                <div
                  className='flex w-[150px] flex-shrink-0 items-center justify-start gap-4 text-nowrap'
                  key={`${logo.name}-1`}
                >
                  <Image
                    alt={`${logo.name} logo`}
                    className='size-12 flex-shrink-0 opacity-60 transition-opacity hover:opacity-100'
                    height={100}
                    src={logo.src}
                    width={100}
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set of logos for seamless scrolling */}
            <div className='flex animate-marquee items-center gap-8'>
              {logos.map(logo => (
                <div
                  className='flex w-[150px] flex-shrink-0 items-center justify-start gap-4 text-nowrap'
                  key={`${logo.name}-2`}
                >
                  <Image
                    alt={`${logo.name} logo`}
                    className='size-12 flex-shrink-0 opacity-60 transition-opacity hover:opacity-100'
                    height={100}
                    src={logo.src}
                    width={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
