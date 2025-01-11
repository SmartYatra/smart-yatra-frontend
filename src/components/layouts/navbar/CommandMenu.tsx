'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Globe, Link, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface ICommandMenuProps {
  className?: string;
}

export const CommandMenu = ({ className }: ICommandMenuProps) => {
  const t = useTranslations();

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const themes = [
    { id: 'light', nameKey: 'Light Mode' },
    { id: 'dark', nameKey: 'Dark Mode' },
  ];

  const onThemeSelect = useCallback(
    (id: string) => {
      runCommand(() => setTheme(id));
    },
    [runCommand, setTheme]
  );

  const onLanguageSelect = (value: string): void => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  // List of navigation items
  const routeList = [
    {
      name: t('Navbar.NavMenuItem.driver'),
      href: '#', // Link to driver registration page
    },
    {
      name: t('Navbar.NavMenuItem.passenger'),
      href: '#', // Link to passenger page
    },
    {
      name: t('Navbar.NavMenuItem.pricing'),
      href: '#', // Link to pricing page
    },
    {
      name: t('Navbar.NavMenuItem.blog'),
      href: '#', // Link to blog page
    },
  ];

  return (
    <div className={cn('relative', className)}>
      <Button
        variant='outline'
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none max-sm:border-none max-sm:bg-transparent max-sm:p-2 sm:pr-12 md:w-40 lg:w-56 xl:w-64'
        )}
        onClick={() => setOpen(true)}
      >
        <span className='hidden lg:inline-flex'>Search documentation...</span>
        <span className='hidden sm:inline-flex lg:hidden'>Search...</span>
        <Search className='h-4 w-4 text-foreground sm:hidden' />

        <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading='Links'>
            {routeList.map((item, index) => (
              <CommandItem
                key={index}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <Link />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading='Theme'>
            {themes.map(({ id, nameKey }) => (
              <CommandItem
                key={id}
                value={nameKey}
                onSelect={() => onThemeSelect(id)}
              >
                <div className='flex items-center gap-2'>
                  <span
                    className='theme-colors block size-3 rounded-full'
                    style={{ backgroundColor: `hsl(var(--${id}-bg))` }}
                  />
                </div>
                {nameKey}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading='Language'>
            {routing.locales.map(availableLocale => (
              <CommandItem
                key={availableLocale}
                value={availableLocale}
                onSelect={() => onLanguageSelect(availableLocale)}
              >
                <Globe className='mr-2 h-4 w-4' />
                {t(`Navbar.locale.options.${availableLocale}`)}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
