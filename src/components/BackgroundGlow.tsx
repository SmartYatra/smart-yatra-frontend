import React from 'react';

import { cn } from '@/lib/utils';

interface IBackgroundGlowProps {
  className?: string;
}

const BackgroundGlow = ({ className }: IBackgroundGlowProps) => {
  return (
    <div
      className={cn(
        'absolute -left-80 bottom-96 -z-10 size-[800px] rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl dark:from-primary/30',
        className
      )}
    />
  );
};

export default BackgroundGlow;
