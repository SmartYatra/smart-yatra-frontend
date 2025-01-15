'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({
  className,
  showText,
}: {
  className?: string;
  showText?: boolean;
}) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('themeToggle');

  const handleThemeChange = React.useCallback(
    (id: string) => {
      setTheme(id);
    },
    [setTheme]
  );

  return (
    <Button
      aria-label={t('toggleButtonLabel')}
      size='icon'
      variant='ghost'
      className={cn(
        {
          'justify-start': showText,
        },
        className
      )}
      onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun
        aria-hidden='true'
        className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
      />
      <Moon
        aria-hidden='true'
        className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
      />

      {showText && (
        <span className='capitalize'>
          {theme === 'dark' ? 'dark mode' : 'light mode'}
        </span>
      )}
      <span className='sr-only'>{t('toggleButtonLabel')}</span>
    </Button>
  );
}
