'use client';

import React from 'react';
import { useRouter } from 'nextjs-toploader/app';

import { ChevronLeft } from 'lucide-react';

const Back = () => {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <nav>
      <div
        className='group flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        onClick={handleBack}
      >
        <ChevronLeft
          className='mt-0.5 transition-transform group-hover:-translate-x-1'
          size={17}
        />
        Back
      </div>
    </nav>
  );
};

export default Back;
