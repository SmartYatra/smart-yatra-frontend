import React from 'react';

import { ChevronRight } from 'lucide-react';

import { Link } from '@/i18n/routing';

const Back = () => {
  return (
    <nav>
      <Link
        className='group flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        href='/'
      >
        Back to home
        <ChevronRight
          className='mt-0.5 transition-transform group-hover:translate-x-1'
          size={17}
        />{' '}
      </Link>
    </nav>
  );
};

export default Back;
