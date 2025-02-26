'use client';

import { useEffect, useState } from 'react';
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

import { useScanQrCode } from '../_hooks/useScanQRCode';

const ScanQRCode = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // const qrReaderRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element

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
      // Reset location when the dialog is closed
      setLatitude(null);
      setLongitude(null);
    }
  }, [isDialogOpen]);

  // Handle QR code scanning result
  const handleResult: OnResultFunction = (result, error) => {
    if (result?.getText()) {
      if (!loading) {
        setLoading(true);
        setData(result.getText());

        // Example payload, update as per your QR code data
        const payload = {
          bus_id: 123, // example bus ID
          passenger_id: 456, // example passenger ID
          auth_token: 'some-auth-token', // replace with actual token
          longitude: longitude || 0, // set user's longitude if available
          latitude: latitude || 0, // set user's latitude if available
        };

        // Send the QR code data to the server
        scanQrCode(payload);
      }
    } else if (error) {
      setError('Unable to scan QR code. Please try again.');
      setLoading(false);
    }
  };

  // Reset states and stop the camera when the dialog is closed
  const resetStates = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setIsDialogOpen(false);
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Stop all tracks to stop the camera
    }
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
        <Dialog
          open={isDialogOpen}
          onOpenChange={open => {
            setIsDialogOpen(open);
            if (!open) {
              resetStates(); // Call resetStates when dialog is closed
            }
          }}
        >
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
                // ref={qrReaderRef} // Attach the reference to the QrReader
                scanDelay={1000}
                videoContainerStyle={{ width: '100%' }} // Style the video container
                onResult={(result, error) => {
                  setLoading(true);
                  handleResult(result, error);
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
