'use client';

import { useEffect, useState } from 'react';

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
import { Scanner } from '@yudiel/react-qr-scanner';

import { useScanQrCode } from '../_hooks/useScanQRCode';

const ScanQRCode = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { mutate: scanQrCode, isPending: isScanning } = useScanQrCode();

  // Get user's current location
  useEffect(() => {
    if (isDialogOpen) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error(error);
          setError('Failed to get your location');
        }
      );
    } else {
      setLatitude(null);
      setLongitude(null);
    }
  }, [isDialogOpen]);

  // Handle QR code scanning result
  const handleResult = (qrText: string) => {
    if (!qrText) return;
    setData(qrText);

    // Example payload, update as per your QR code data
    const payload = {
      bus_id: 123, // example bus ID
      passenger_id: 456, // example passenger ID
      auth_token: 'some-auth-token', // replace with actual token
      longitude: longitude || 0,
      latitude: latitude || 0,
    };

    // Send the QR code data to the server
    scanQrCode(payload);
  };

  return (
    <Card className='mx-auto w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>QR Code Scanner</span>
          <Scan className='h-6 w-6 text-primary' />
        </CardTitle>
        <CardDescription>Scan a QR code to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <Scanner
                onScan={detectedCodes => {
                  if (detectedCodes.length > 0) {
                    handleResult(detectedCodes[0].rawValue);
                  }
                }}
              />
            </div>

            {isScanning && (
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
