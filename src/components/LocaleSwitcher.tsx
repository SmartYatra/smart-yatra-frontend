'use client';

import { JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * LocaleSwitcher component that allows the user to switch between available locales.
 * It updates the page URL and refreshes the page with the selected locale.
 *
 * @param {Object} props - Component props.
 * @param {string} props.className - The component's CSS class name.
 * @returns {JSX.Element} The locale switcher component.
 */
export const LocaleSwitcher = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navbar.locale');

  // Handle the locale change event, updating the URL with the new locale.
  const handleChange = (value: string): void => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger aria-label={t('label')} className={cn('w-fit', className)}>
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('label')}</SelectLabel>
          {routing.locales.map(availableLocale => (
            <SelectItem key={availableLocale} value={availableLocale}>
              {t(`options.${availableLocale}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
