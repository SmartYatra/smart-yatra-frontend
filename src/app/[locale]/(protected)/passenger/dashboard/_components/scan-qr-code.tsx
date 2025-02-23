'use client';

import { useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

import { Scan } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ScanQRCode = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResult: OnResultFunction = (result, error) => {
    if (result?.getText()) {
      if (!loading) {
        setLoading(true);
        setData(result.getText());
      }
    } else if (error) {
      setError('Unable to scan QR code. Please try again.');
      setLoading(false);
    }
  };

  // Reset states when modal is closed
  const resetStates = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>QR Code Scanner</span>
          <Scan className='h-6 w-6 text-primary' />
        </CardTitle>
        <CardDescription>Scan a QR code to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog onOpenChange={resetStates}>
          <DialogTrigger asChild>
            <Button className='w-full'>Open QR Scanner</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
              <DialogDescription>
                Scan a QR code using your camera.
              </DialogDescription>
            </DialogHeader>

            <div className='mt-2'>
              {/* Reset QR reader on each open */}
              <QrReader
                className='w-full'
                constraints={{ facingMode: 'environment' }}
                scanDelay={1000}
                onResult={(result, error) => {
                  setLoading(true);
                  handleResult(result, error);
                }}
              />
            </div>

            {loading && (
              <p className='mt-2 text-sm text-blue-600'>Scanning QR code...</p>
            )}

            {data && (
              <div className='mt-4 rounded-md bg-secondary p-4'>
                <p className='font-medium'>QR Code Scanned:</p>
                <p className='mt-2 break-all'>{data}</p>
              </div>
            )}
            {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}

            <DialogFooter>
              <DialogClose asChild>
                <Button className='mt-4 w-full' variant='ghost'>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ScanQRCode;
