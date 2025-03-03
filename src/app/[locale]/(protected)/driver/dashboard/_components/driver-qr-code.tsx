'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

import copy from 'clipboard-copy';
import { toPng } from 'html-to-image';
import { Check, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

import LoadingSpinner from '@/components/loading-spinner';
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
  const [isExtracting, setIsExtracting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data, isPending } = useFetchQR();
  const qrRef = useRef<HTMLDivElement>(null);

  const handleExtract = async () => {
    if (qrRef.current === null) {
      return;
    }

    try {
      setIsExtracting(true);
      const dataUrl = await toPng(qrRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = dataUrl;
      link.click();
      toast.success('QR Code downloaded successfully');
    } catch (err) {
      console.log(err);
      toast.error('Failed to download QR Code');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCopy = async () => {
    if (!data) return;

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify(data))}`;
    try {
      await copy(url);
      setCopied(true);
      toast.success('QR Code URL copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast.error('Failed to copy QR Code URL');
    }
  };

  return (
    <Card className='mt-8 w-full sm:w-fit'>
      <CardContent className='relative flex items-center justify-center pt-10'>
        {isPending ? (
          <Skeleton className='size-60' />
        ) : (
          <>
            <div ref={qrRef}>
              <Image
                alt='QR Code'
                className='size-56'
                height={150}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify(data))}`}
                width={150}
              />
            </div>
            <Button
              className='absolute right-2 top-2'
              size='icon'
              variant='ghost'
              onClick={handleCopy}
            >
              {copied ? (
                <Check className='h-4 w-4' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </>
        )}
      </CardContent>
      <CardFooter className='flex-col items-start gap-2'>
        <CardDescription>
          Download or extract the QR code for your bus.
        </CardDescription>

        <Button
          className='w-full'
          disabled={isPending || isExtracting}
          onClick={handleExtract}
        >
          {isExtracting ? (
            <>
              <LoadingSpinner /> Extracting...
            </>
          ) : (
            <>
              <Download className='mr-2 h-4 w-4' /> Extract QR Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DriverQrCode;
