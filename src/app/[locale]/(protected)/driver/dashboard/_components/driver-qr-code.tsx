import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useFetchQR } from '../_hooks/useFetchQR';

const DriverQrCode = () => {
  const { data, isPending } = useFetchQR();

  return (
    <Card className='mt-8 w-full sm:w-fit'>
      <CardContent className='flex items-center justify-center pt-10'>
        {isPending ? (
          <Skeleton className='size-60' />
        ) : (
          <Image
            alt='QR Code'
            className='size-56'
            height={150}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${JSON.stringify(data)}`}
            width={150}
          />
        )}
      </CardContent>
      <CardFooter className='flex-col items-start gap-2'>
        <CardDescription>
          Download or extract the QR code for your bus.
        </CardDescription>

        {/* Extract button */}
        <Button className='w-full'>Extract</Button>
      </CardFooter>
    </Card>
  );
};

export default DriverQrCode;
