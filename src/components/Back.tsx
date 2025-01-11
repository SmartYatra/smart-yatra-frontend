import React from 'react';

import { ChevronLeft } from 'lucide-react';

import { Link } from '@/i18n/routing';

const Back = () => {
  return (
    <nav className='mb-8'>
      <Link
        className='group flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        href='/'
      >
        <ChevronLeft
          className='transition-transform group-hover:-translate-x-1'
          size={17}
        />{' '}
        Back to home
      </Link>
    </nav>
  );
};

export default Back;
