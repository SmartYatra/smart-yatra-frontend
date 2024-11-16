import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Card } from '@/components/ui';

interface IAuthWrapperProps {
  children: React.ReactNode;
  meta?: {
    title: string;
    description: string;
  };
}

const AuthWrapper = ({ children, meta }: IAuthWrapperProps) => {
  return (
    <>
      <Helmet>
        <title>{meta?.title}</title>
        <meta content={meta?.description} name="description" />
      </Helmet>
      <div className="flex min-h-screen w-full flex-col">
        <main className="max-container relative flex flex-1 flex-col items-center justify-center gap-8 py-10">
          <div className="fixed top-0 -z-50 h-1/2 w-full bg-gray-50" />
          <div className="fixed bottom-0 -z-50 h-1/2 w-full bg-gray-100" />

          <Card className="w-full max-w-[30rem] px-2 py-4">{children}</Card>
        </main>
      </div>
    </>
  );
};

export default AuthWrapper;
