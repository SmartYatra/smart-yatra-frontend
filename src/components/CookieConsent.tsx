'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription } from './ui/card'; // Importing Card components

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className='fixed bottom-0 left-0 z-50 m-4 flex max-w-md flex-col justify-between gap-4 p-4 py-6 shadow-lg sm:m-0 md:bottom-5 md:right-5'>
      <CardContent className='flex flex-col gap-4 p-0'>
        <CardDescription className='mr-4 text-foreground'>
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.{' '}
          <Link className='text-primary hover:underline' href='/privacy'>
            Learn more
          </Link>
        </CardDescription>
        <div className='flex items-center gap-4'>
          <Button className='w-28' variant='outline' onClick={declineCookies}>
            Decline
          </Button>
          <Button className='w-28' onClick={acceptCookies}>
            Accept
          </Button>
        </div>
        <button
          aria-label='Close cookie consent'
          className='absolute right-2 top-2 text-muted-foreground hover:text-foreground'
          onClick={declineCookies}
        >
          <X size={18} />
        </button>
      </CardContent>
    </Card>
  );
}
