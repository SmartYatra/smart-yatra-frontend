import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IPageWrapper extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className, ...props }: IPageWrapper) => {
  return (
    <div className={cn('pt-16', className)} {...props}>
      {children}
    </div>
  );
};

const SectionWrapper = ({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section className={cn('relative py-16 text-center', className)} id={id}>
      {children}
    </section>
  );
};

const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('mb-2 text-2xl font-bold md:text-4xl', className)}>
      {children}
    </p>
  );
};

const SectionSubtitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        'mb-2 text-xs font-semibold uppercase tracking-wider text-tertiary md:text-sm',
        className
      )}
    >
      {children}
    </h2>
  );
};

const SectionDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        'mb-10 text-sm text-muted-foreground md:text-base',
        className
      )}
    >
      {children}
    </p>
  );
};

export {
  PageWrapper,
  SectionDescription,
  SectionSubtitle,
  SectionTitle,
  SectionWrapper,
};
