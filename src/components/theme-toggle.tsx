'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ThemeToggle({ className }: { className?: string }) {
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
      className={className}
      size='icon'
      variant='ghost'
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
      <span className='sr-only'>{t('toggleButtonLabel')}</span>
    </Button>
  );
}
