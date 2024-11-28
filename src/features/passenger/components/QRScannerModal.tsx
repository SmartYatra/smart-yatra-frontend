import React, { useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

import { Button } from '@/components/ui';
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

interface QRScannerModalProps {
  onScanSuccess: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onScanSuccess }) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResult: OnResultFunction = (result, error) => {
    if (result?.getText()) {
      if (!loading) {
        setLoading(true);
        setData(result.getText());
        onScanSuccess(result.getText());
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
    <Dialog onOpenChange={resetStates}>
      <DialogTrigger asChild>
        <Button className="h-10" variant="outline">
          Scan QR Code
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code within the camera view to scan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center">
          <QrReader
            className="w-full"
            scanDelay={1000}
            constraints={{
              facingMode: 'environment', // Use the rear camera
            }}
            onResult={(result, error) => {
              setLoading(true);
              handleResult(result, error);
            }}
          />
          {loading && <p className="mt-2 text-sm text-blue-600">Scanning QR code...</p>}
          {data && (
            <p className="mt-2 text-sm text-gray-600">
              <strong>Scanned Data:</strong> {data}
            </p>
          )}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="rounded" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRScannerModal;
