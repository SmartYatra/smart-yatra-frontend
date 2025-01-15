import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DriverQrCode = () => {
  return (
    <section className='mt-8 md:w-fit'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>QR Code for Bus</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <Image
            alt='QR Code'
            className='size-56'
            height={150}
            src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Driver%20Name%3A%20Diwash%20Bhattarai%0A%0ABus%20Number%3A%20BA%201%0A%0ADriver%20License%3A%20A1234567'
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
