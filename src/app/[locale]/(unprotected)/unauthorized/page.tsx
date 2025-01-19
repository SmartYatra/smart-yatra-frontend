'use client';

import { AlertTriangle, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <div className='flex flex-col items-center'>
        {/* Warning Icon */}
        <AlertTriangle className='h-16 w-16 text-red-500' />

        <h1 className='mt-4 text-3xl font-bold'>403 - Unauthorized Access</h1>
        <p className='mt-2 text-muted-foreground'>
          Oops! You don&apos;t have permission to access this page.
        </p>

        {/* Buttons */}
        <div className='mt-10 flex space-x-4'>
          <Button
            className='w-40'
            variant='outline'
            onClick={() => router.back()}
          >
            Go Back
          </Button>

          <Button className='w-40' onClick={() => router.push('/signin')}>
            <LogIn className='mr-2 h-5 w-5' />
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
