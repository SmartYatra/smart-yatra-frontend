import { ReactNode } from 'react';

export const DashboardTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className='text-2xl font-semibold'>{children}</h1>;
};

export const DashboardSubtitle = ({ children }: { children: ReactNode }) => {
  return <p className='text-sm text-muted-foreground'>{children}</p>;
};

export const DashboardSection = ({ children }: { children: ReactNode }) => {
  return <section className='space-y-4'>{children}</section>;
};
