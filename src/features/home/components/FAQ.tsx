'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
} from '@/components/page-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ() {
  const t = useTranslations('HomePage.FAQ');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(prevItems =>
      prevItems.includes(value)
        ? prevItems.filter(item => item !== value)
        : [...prevItems, value]
    );
  };

  const faqs: FAQItem[] = [
    {
      question: t('whatIsSmartYatraQuestion'),
      answer: t('whatIsSmartYatraAnswer'),
    },
    {
      question: t('howToGetStartedQuestion'),
      answer: t('howToGetStartedAnswer'),
    },
    {
      question: t('compatibilityQuestion'),
      answer: t('compatibilityAnswer'),
    },
    {
      question: t('languageSupportQuestion'),
      answer: t('languageSupportAnswer'),
    },
    {
      question: t('updatesQuestion'),
      answer: t('updatesAnswer'),
    },
    {
      question: t('pricingQuestion'),
      answer: t('pricingAnswer'),
    },
  ];

  return (
    <SectionWrapper id='faq'>
      <SectionSubtitle>{t('sectionTitle')}</SectionSubtitle>
      <SectionTitle>{t('headline')}</SectionTitle>
      <SectionDescription>{t('description')}</SectionDescription>
      <Accordion
        className='mx-auto flex max-w-4xl flex-col gap-4'
        type='multiple'
        value={openItems}
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            className='rounded-lg border hover:bg-muted/50'
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger
              className='rounded-lg px-2 hover:no-underline'
              onClick={() => toggleItem(`item-${index}`)}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className='px-2 text-left text-muted-foreground'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
