import * as React from 'react';

import { Eye, EyeOff, LucideIcon } from 'lucide-react';

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
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return (
      <div className='space-y-1'>
        <div className='relative'>
          {LeftIcon && (
            <LeftIcon className='pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-secondary-foreground/50' />
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              'flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-destructive focus-visible:ring-destructive': error,
                'pl-10': LeftIcon,
                'pr-10': type === 'password' || RightIcon,
              },
              className
            )}
            {...props}
          />

          {type === 'password' && (
            <button
              className='absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground/50 focus:outline-none'
              type='button'
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </button>
          )}

          {RightIcon && type !== 'password' && (
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
