import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundGlowVariants = cva(
  'absolute -z-10 from-primary/10 to-primary/5 blur-3xl dark:from-primary/30 rounded-full',
  {
    variants: {
      position: {
        left: '-left-40 !bg-gradient-to-r',
        right: '-right-40 -left-auto !bg-gradient-to-l',
        top: '-top-40 !bottom-auto !bg-gradient-to-b',
        bottom: '-bottom-40 !bg-gradient-to-t',
        'top-left':
          '-top-40 -left-40 !bottom-auto !right-auto !bg-gradient-to-r',
        'top-right': '-top-40 -right-40 -left-auto !bg-gradient-to-l',
        'bottom-left':
          '-bottom-40 -left-40 !top-auto !right-auto !bg-gradient-to-r',
        'bottom-right': '!-bottom-40 -right-40 !left-auto !bg-gradient-to-l',
      },
      size: {
        sm: 'size-[400px]',
        md: 'size-[600px]',
        lg: 'size-[800px]',
        xl: 'size-[1000px]',
      },
    },
    defaultVariants: {
      position: 'left',
      size: 'md',
    },
  }
);

export interface BackgroundGlowVariants
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundGlowVariants> {}

const BackgroundGlow = React.forwardRef<HTMLDivElement, BackgroundGlowVariants>(
  ({ position, size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          backgroundGlowVariants({ position, size, className }),
          'absolute -left-80 bottom-96 -z-10 size-[800px] bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl dark:from-primary/30',
          className
        )}
        {...props}
        // style={{
        //   clipPath: `path('M 300 150 Q 400 50, 500 150 T 700 300 Q 600 450, 400 450 Q 200 450, 100 300 Q 50 200, 300 150 Z')`,
        // }}
      />
    );
  }
);
BackgroundGlow.displayName = 'BackgroundGlow';

export default BackgroundGlow;
