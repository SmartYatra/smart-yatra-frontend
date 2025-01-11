import * as React from 'react';

import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className='space-y-1'>
        <div className='relative'>
          {LeftIcon && (
            <LeftIcon className='pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-secondary-foreground/50' />
          )}

          <input
            ref={ref}
            type={type}
            className={cn(
              'flex h-12 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-destructive focus-visible:ring-destructive': error,
                'pl-10': LeftIcon,
                'pr-10': RightIcon,
              },
              className
            )}
            {...props}
          />

          {RightIcon && (
            <RightIcon className='pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-secondary-foreground/50' />
          )}
        </div>

        <div
          className={cn(
            'text-sm text-destructive transition-all duration-300',
            { 'pointer-events-none h-0': !error },
            { 'pointer-events-auto h-6': error }
          )}
        >
          {error}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
