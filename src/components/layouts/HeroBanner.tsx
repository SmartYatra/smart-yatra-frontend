'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { X } from 'lucide-react';

import { Link } from '@/i18n/routing';

import { Button } from '../ui/button';

/**
 * Component: HeroBanner
 * A banner component that invites users to explore the developer toolkit.
 * The banner is dismissible by the user.
 */
export function HeroBanner() {
  const t = useTranslations('HomePage.HeroBanner');

  const [isVisible, setIsVisible] = useState(true);

  // Return null if the banner is dismissed
  if (!isVisible) return null;

  return (
    <div
      className='hidden w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent py-2 text-sm text-foreground backdrop-blur-md md:block'
      role='banner'
    >
      <div className='container mx-auto flex items-center justify-center gap-4 px-4'>
        {/* Main Banner Content */}
        <div className='flex flex-col'>
          <span className='text-sm font-bold text-primary-foreground'>
            {t('superchargeText')}
          </span>
        </div>

        {/* Link to Project */}
        <Link
          aria-label={t('ariaExploreToolkit')}
          className='group flex items-center justify-center gap-2 font-semibold text-primary-foreground/90 hover:text-primary-foreground'
          href='/toolkit'
        >
          {t('exploreToolkitText')}
          <svg
            aria-hidden='true' // SVG is decorative, not important for screen readers
            className='size-5 transition-transform group-hover:translate-x-1'
            fill='none'
            height='24'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M14 7l5 5-5 5' />
            <path d='M5 12h14' />
          </svg>
        </Link>

        {/* Close button */}
        <Button
          aria-label={t('closeBannerAriaLabel')}
          className='absolute right-4 rounded-full text-foreground/60 transition-colors hover:text-foreground'
          size={'icon'}
          variant={'ghost'}
          onClick={() => setIsVisible(false)}
        >
          <X className='size-4' />
        </Button>
      </div>
    </div>
  );
}
