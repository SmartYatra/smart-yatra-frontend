import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

import { useFetchQR } from '../_hooks/useFetchQR';

const DriverQrCode = () => {
  const { data } = useFetchQR();

  console.log(data);

  return (
    <section className='mt-8 md:w-fit'>
      <Card>
        <CardContent className='flex items-center justify-center pt-10'>
          <Image
            alt='QR Code'
            className='size-56'
            height={150}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${JSON.stringify(data?.data)}`}
            width={150}
          />
        </CardContent>
        <CardFooter className='flex-col items-start gap-2'>
          <CardDescription>
            Download or extract the QR code for your bus.
          </CardDescription>

          {/* Extract button */}
          <Button className='w-full'>Extract</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default DriverQrCode;
