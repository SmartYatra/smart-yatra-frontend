'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
} from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';

export const Newsletter = () => {
  const t = useTranslations('HomePage.Newsletter');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here
    console.log('Subscribing email:', email);
  };

  return (
    <SectionWrapper className='pb-32'>
      <SectionSubtitle>{t('sectionTitle')}</SectionSubtitle>
      <SectionTitle>{t('headline')}</SectionTitle>
      <SectionDescription className='mx-auto max-w-2xl'>
        {t('description')}
      </SectionDescription>

      <form
        className='mx-auto flex max-w-md flex-col gap-3 sm:flex-row'
        onSubmit={handleSubmit}
      >
        <Input
          required
          className='h-auto py-2.5'
          placeholder={t('emailPlaceholder')}
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button className='h-auto w-48' type='submit'>
          {t('subscribeButton')}
        </Button>
      </form>

      <p className='mt-4 text-sm text-muted-foreground'>
        {t('agreement')}{' '}
        <Link
          className='text-blue-600 underline underline-offset-2 hover:text-blue-400'
          href='/terms'
        >
          {t('terms')}
        </Link>{' '}
        {t('and')}{' '}
        <Link
          className='text-blue-600 underline underline-offset-2 hover:text-blue-400'
          href='/privacy'
        >
          {t('privacy')}
        </Link>
        .
      </p>
    </SectionWrapper>
  );
};
