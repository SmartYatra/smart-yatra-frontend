import { useTranslations } from 'next-intl';

import {
  Description,
  Heading,
  Icon,
  NotFoundLayout,
  ReturnHomeButton,
} from '@/components/NotFound';

/**
 * Component: NotFound
 * A 404 page component displayed when the requested page is not found for internationalized pages.
 *
 * @returns The 404 page component.
 */
export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <NotFoundLayout>
      <Icon />
      <Heading>{t('heading')}</Heading>
      <Description>{t('description')}</Description>
      <ReturnHomeButton buttonText={t('buttonText')} href='/' />
    </NotFoundLayout>
  );
}
