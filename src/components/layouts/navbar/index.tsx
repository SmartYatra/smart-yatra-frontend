'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import { ChevronDown, Github, Menu } from 'lucide-react';

// import { LocaleSwitcher } from '@/components/locale-switcher';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { CommandMenu } from './CommandMenu';
import NavMenuItem, { IRouteList } from './NavMenuItem';

import { HeroBanner } from '../HeroBanner';

export function Navbar() {
  const t = useTranslations('Navbar');

  // List of navigation items
  const routeList: IRouteList[] = [
    {
      name: t('NavMenuItem.driver'),
      href: '/driver/dashboard',
    },
    {
      name: t('NavMenuItem.passenger'),
      href: '#',
    },
    {
      name: t('NavMenuItem.pricing'),
      href: '#',
    },
    {
      name: t('NavMenuItem.blog'),
      href: '#',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  // Handle scroll behavior for dynamic navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 150);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      animate={{ y: scrollDirection === 'up' ? 0 : -100 }}
      initial={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 z-40 w-full border-b border-border bg-transparent backdrop-blur-md',
        { 'bg-background/50': isScrolled }
      )}
    >
      <HeroBanner />
      <div className='container mx-auto w-full max-w-[1800px]'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left section (Logo and Navigation links) */}
          <div className='flex items-center gap-4 sm:gap-6'>
            {/* Logo */}
            <Logo />

            {/* Navigation links (hidden in mobile view) */}
            <div className='hidden items-center 2xl:flex'>
              {routeList.map((item, index) => (
                <NavMenuItem item={item} key={index} />
              ))}
            </div>
          </div>

          {/* Right section (GitHub link, theme toggle, and Language switch) */}
          <div className='flex items-center sm:gap-4'>
            {/* SearchBar */}
            <CommandMenu />

            {/* GitHub link */}
            <Link
              aria-label={t('githubStar')}
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href='https://github.com/diwashbhattarai999/smart-yatra'
              target='_blank'
            >
              <Github className='size-5' />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            {/* <LocaleSwitcher className='hidden sm:flex' /> */}

            {/* Login and Sign Up buttons */}
            <Link
              aria-label='Signin'
              href='/signin'
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'hidden 2xl:flex'
              )}
            >
              Signin
            </Link>
            <Link
              aria-label='Sign Up'
              href='/signup'
              className={cn(
                buttonVariants({ variant: 'default' }),
                'hidden 2xl:flex'
              )}
            >
              Sign Up
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className='2xl:hidden'>
                <Button
                  aria-label={t('openMobileMenu')}
                  size='icon'
                  variant='ghost'
                >
                  <Menu className='flex !size-5' />
                </Button>
              </SheetTrigger>

              <SheetContent
                className='flex h-[calc(100vh-0rem)] flex-col'
                side='top'
              >
                <SheetHeader>
                  <SheetTitle className='text-xl font-bold'>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <nav className='mt-10 flex flex-col gap-3'>
                  {routeList.map((item, index) => (
                    <Button
                      aria-label={item.name}
                      className='h-12 items-center justify-start text-base hover:text-primary'
                      key={index}
                      variant='ghost'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.subMenu && <ChevronDown className='size-4' />}
                    </Button>
                  ))}
                </nav>

                <SheetFooter className='gap-4 max-sm:flex-1'>
                  {/* Language Toggle */}
                  {/* <LocaleSwitcher className='w-full md:w-fit' /> */}

                  {/* Login and Sign Up buttons */}
                  <Link
                    aria-label='Signin'
                    href='/signin'
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-9 w-full md:w-fit'
                    )}
                  >
                    Signin
                  </Link>
                  <Link
                    aria-label='Sign Up'
                    href='/signup'
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'h-9 w-full md:w-fit'
                    )}
                  >
                    Sign Up
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
