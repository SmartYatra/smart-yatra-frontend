'use client';

import { useState } from 'react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Scanner } from '@yudiel/react-qr-scanner';

import { useFetchStops } from '../_hooks/useFetchStops';
import { useScanQrCode } from '../_hooks/useScanQRCode';

const ScanQRCode = ({ mode }: { mode: 'onboard' | 'exit' }) => {
  // const [error, setError] = useState<string | null>(null);
  // const [latitude, setLatitude] = useState<number | null>(null);
  // const [longitude, setLongitude] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [stopId, setStopId] = useState<number | null>(null); // Single stopId instead of start/end

  const { mutate: scanQrCode, isPending: isScanning } = useScanQrCode();
  const { data: stopsData } = useFetchStops();

  // useEffect(() => {
  //   if (isDialogOpen) {
  //     navigator.geolocation.getCurrentPosition(
  //       position => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       },
  //       error => {
  //         console.error(error);
  //         setError('Failed to get your location');
  //       }
  //     );
  //   } else {
  //     setLatitude(null);
  //     setLongitude(null);
  //   }
  // }, [isDialogOpen]);

  const handleResult = (qrText: string) => {
    if (!qrText) return;
    const qrData = JSON.parse(qrText);

    const payload = {
      bus_id: qrData.bus_id,
      stop_id: stopId, // Single stop_id for both onboard & exit
    };

    scanQrCode(payload, {
      onSuccess: () => setIsDialogOpen(false),
    });
  };

  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{mode === 'onboard' ? 'Onboard' : 'Exit'} QR Scanner</span>
          <Scan className='h-6 w-6 text-primary' />
        </CardTitle>
        <CardDescription>
          Select a stop and scan the QR code to{' '}
          {mode === 'onboard' ? 'onboard' : 'exit'}.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Select onValueChange={value => setStopId(Number(value))}>
          <SelectTrigger>
            <SelectValue
              placeholder={`Select ${mode === 'onboard' ? 'start' : 'end'} stop`}
            />
          </SelectTrigger>
          <SelectContent>
            {stopsData?.stops.map(stop => (
              <SelectItem key={stop.id} value={stop.id.toString()}>
                {stop.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='w-full' disabled={!stopId}>
              Open QR Scanner
            </Button>
          </DialogTrigger>

          <DialogContent className='max-h-[80vh] overflow-y-auto'>
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

            {/* {error && <p className='mt-2 text-sm text-red-600'>{error}</p>} */}

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
