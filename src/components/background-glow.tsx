import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundGlowVariants = cva(
  'absolute -z-10 from-primary/10 to-primary/5 blur-3xl dark:from-primary/30 rounded-full',
  {
    variants: {
      position: {
        left: '-left-40 bg-gradient-to-r',
        right: '-right-40 bg-gradient-to-l',
        top: '-top-40 bg-gradient-to-b',
        bottom: '-bottom-40 bg-gradient-to-t',
        'top-left': 'top-80 -left-80 bg-gradient-to-r',
        'top-right': '-top-40 -right-40 bg-gradient-to-l',
        'top-center': 'left-1/2 -translate-x-1/2 -top-80 bg-gradient-to-b',
        'bottom-left': '-bottom-40 -left-80 bg-gradient-to-r',
        'bottom-right': '-bottom-40 -right-40 bg-gradient-to-l',
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
    compoundVariants: [
      {
        position: 'bottom-left',
        size: 'lg',
        className: '-bottom-80 -left-[30rem]',
      },
      {
        position: 'top-left',
        size: 'lg',
        className: '-left-[30rem]',
      },
      {
        position: 'right',
        size: 'lg',
        className: '-right-[30rem] bottom-[32rem]',
      },
    ],
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
