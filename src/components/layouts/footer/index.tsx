'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import LinkSection from './LinkSection';
import SocialLinks from './SocialLinks';

import Logo from '../../logo';

export type ILink = {
  name: string;
  href: string;
};

interface IFooterProps {
  className?: string;
}

export function Footer({ className }: IFooterProps): JSX.Element {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const QUICK_STARTS_LINKS: ILink[] = [
    { name: t('footer.quickStarts.items.driver'), href: '/driver-guide' },
    { name: t('footer.quickStarts.items.passenger'), href: '/passenger-guide' },
  ];

  const PRODUCT_LINKS: ILink[] = [
    {
      name: t('footer.products.items.journeyTracking'),
      href: '/journey-tracking',
    },
    { name: t('footer.products.items.fareDeduction'), href: '/fare-deduction' },
  ];

  const LEARN_LINKS: ILink[] = [
    { name: t('footer.learn.items.docs'), href: '/docs' },
    { name: t('footer.learn.items.integrations'), href: '/integrations' },
    { name: t('footer.learn.items.community'), href: '/community' },
    { name: t('footer.learn.items.blog'), href: '/blog' },
    { name: t('footer.learn.items.changelog'), href: '/changelog' },
    { name: t('footer.learn.items.roadmap'), href: '/roadmap' },
    { name: t('footer.learn.items.sourceCode'), href: '/source-code' },
  ];

  const PROGRAM_LINKS: ILink[] = [
    {
      name: t('footer.programs.items.openSourceContributions'),
      href: '/contributions',
    },
    { name: t('footer.programs.items.startups'), href: '/startups' },
    { name: t('footer.programs.items.education'), href: '/education' },
  ];

  const ABOUT_LINKS: ILink[] = [
    { name: t('footer.about.items.aboutUs'), href: '/about' },
    { name: t('footer.about.items.pricing'), href: '/pricing' },
    { name: t('footer.about.items.careers'), href: '/careers' },
    { name: t('footer.about.items.contactUs'), href: '/contact' },
  ];

  return (
    <footer className='border-t pb-8 pt-16'>
      <div className={cn('container', className)}>
        <div className='flex flex-col items-start justify-between gap-8 lg:flex-row'>
          {/* Logo Section */}
          <Logo />

          <div className='grid basis-[50rem] grid-cols-2 gap-16 sm:grid-cols-4 md:grid-cols-5'>
            <LinkSection
              links={QUICK_STARTS_LINKS}
              title={t('footer.quickStarts.label')}
            />
            <LinkSection
              links={PRODUCT_LINKS}
              title={t('footer.products.label')}
            />
            <LinkSection links={LEARN_LINKS} title={t('footer.learn.label')} />
            <LinkSection
              links={PROGRAM_LINKS}
              title={t('footer.programs.label')}
            />
            <LinkSection links={ABOUT_LINKS} title={t('footer.about.label')} />
          </div>
        </div>

        <div className='mt-16 border-t border-white/5 pt-8'>
          <div className='flex flex-col justify-between gap-6 max-sm:items-center sm:gap-4 md:flex-row md:items-center lg:gap-12'>
            <SocialLinks />

            <div className='flex w-full flex-col items-center justify-between gap-4 text-nowrap sm:flex-row sm:gap-4'>
              <div className='flex flex-col items-center gap-1 sm:flex-row sm:gap-4'>
                <span className='text-sm text-muted-foreground'>
                  {t('footer.copyright')} {currentYear} SmartYatra
                </span>
                <span className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-green-500' />
                  <span className='text-sm text-muted-foreground'>
                    {t('footer.online')}
                  </span>
                </span>
              </div>

              <div className='flex items-center gap-4'>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-primary'
                  href='/terms'
                >
                  {t('footer.terms')}
                </Link>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-primary'
                  href='/privacy'
                >
                  {t('footer.privacy')}
                </Link>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-primary'
                  href='#'
                >
                  {t('footer.cookies')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
