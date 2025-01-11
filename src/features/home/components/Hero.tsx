'use client';

import { useTranslations } from 'next-intl';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

/**
 * Component: Hero
 * The main section of the landing page.
 * It includes a headline, a description, and a call to action.
 *
 * @returns The JSX element for the Hero section.
 */
export const Hero = () => {
  const t = useTranslations('HomePage.Hero');
  return (
    <section className='bg-hero-pattern pt-28 md:pt-44'>
      <div className='container flex flex-col items-center'>
        <div className='relative z-10 flex flex-col items-center'>
          <Link
            aria-label={t('changelogLinkAriaLabel')}
            className='flex flex-col gap-2 rounded-md bg-muted/50 px-4 py-2 pr-6 transition-colors hover:bg-muted/80 sm:flex-row sm:items-center sm:rounded-full'
            href='/changelog'
          >
            <div className='flex items-center gap-2'>
              <span className='flex size-1.5 rounded-full bg-primary' />
              <span className='text-xs sm:text-sm'>{t('changelogBadge')}</span>
            </div>
            <div className='group flex items-center gap-1 text-xs text-muted-foreground sm:text-sm'>
              <p>{t('changelogText')}</p>
              <ArrowRight className='size-4 -rotate-45 transition-transform group-hover:translate-x-1' />
            </div>
          </Link>
          <div className='mt-6 max-w-[800px] text-center'>
            <h1 className='text-5xl font-bold leading-[1.1] tracking-tight sm:text-[64px]'>
              {t('headline')}
              <br />
              {t('subHeadline')}
              <span className='ml-2 inline-block h-1.5 w-16 bg-primary' />
            </h1>
            <p className='mt-8 leading-relaxed text-muted-foreground sm:text-lg'>
              {t('description')}
            </p>
            <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Button
                aria-label={t('primaryButtonAriaLabel')}
                className='relative bg-primary px-6 text-base after:absolute after:inset-0 after:z-[-1] after:bg-primary after:opacity-0 after:blur-sm after:transition-opacity hover:bg-primary/90 hover:after:opacity-100 max-sm:w-full sm:h-12'
                size='lg'
              >
                {t('primaryButtonText')}
              </Button>
              <Button
                aria-label={t('secondaryButtonAriaLabel')}
                className='relative border border-primary bg-transparent px-6 text-base text-primary after:absolute after:inset-0 after:z-[-1] after:border-primary after:opacity-0 after:blur-sm after:transition-opacity hover:border-primary/90 hover:after:opacity-100 max-sm:w-full sm:h-12'
                size='lg'
                variant='outline'
              >
                <span className='relative z-10 flex items-center gap-2 transition-colors group-hover:text-primary'>
                  {t('secondaryButtonText')}
                </span>
              </Button>
            </div>
          </div>
        </div>

        <HeroImage />
      </div>
    </section>
  );
};

const HeroImage = () => {
  return (
    <div className='mt-20 w-full'>
      <div className='relative size-full rounded-lg'>
        <div className='z-0 rounded-lg border border-primary/5 bg-foreground/5 p-2 shadow-2xl backdrop-blur-md'>
          <div className='rounded-lg border border-primary/5 bg-muted shadow-2xl backdrop-blur-md'>
            <div className='flex h-full max-h-[800px] min-h-[700px] w-full'>
              <aside className='hidden w-48 space-y-3 border-r border-foreground/5 p-4 sm:block'>
                <div className='flex items-center gap-3 rounded bg-foreground/5 px-3 py-2'>
                  <div className='h-4 w-4 rounded bg-foreground/10' />
                  <div className='h-4 w-20 rounded bg-foreground/10' />
                </div>
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <div className='flex items-center gap-3 px-3 py-2' key={i}>
                      <div className='h-4 w-4 rounded bg-foreground/10' />
                      <div className='h-4 w-20 rounded bg-foreground/10' />
                    </div>
                  ))}
              </aside>

              <div className='flex-1 p-6'>
                <div className='mb-8 flex items-center justify-between'>
                  <div className='hidden space-y-1 sm:block'>
                    <div className='h-6 w-48 rounded bg-foreground/10' />
                    <div className='h-4 w-32 rounded bg-foreground/5' />
                  </div>
                  <div className='flex gap-3'>
                    <div className='h-8 w-20 rounded bg-foreground/5' />
                    <div className='h-8 w-20 rounded bg-foreground/5' />
                  </div>
                </div>
                <div className='grid gap-6 sm:grid-cols-2'>
                  <div className='space-y-4'>
                    <div className='h-[240px] rounded bg-foreground/5' />
                    <div className='h-4 w-32 rounded bg-foreground/10' />
                  </div>
                  <div className='hidden space-y-4 sm:block'>
                    <div className='h-[240px] rounded bg-foreground/5' />
                    <div className='h-4 w-32 rounded bg-foreground/10' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
