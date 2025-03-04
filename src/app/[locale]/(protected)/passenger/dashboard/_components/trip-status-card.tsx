import { BusFront, MapPin } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { IPassengerTripStatus } from '../_hooks/usePassengerTripStatus';

interface TripStatusCardProps {
  tripStatus: IPassengerTripStatus;
}

const TripStatusCard = ({ tripStatus }: TripStatusCardProps) => {
  const boardingTime = new Date(tripStatus?.boarding_time);
  // const timeElapsed = Math.floor((Date.now() - boardingTime.getTime()) / 60000); // in minutes

  return (
    <Card className='size-full max-w-lg grow'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BusFront className='h-6 w-6 text-primary' />
          Ongoing Trip
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 text-sm'>
        <p>
          <strong>Boarded:</strong> {tripStatus?.boarding_stop} at{' '}
          {boardingTime.toLocaleTimeString()}
        </p>
        <p>
          <strong>Bus:</strong> {tripStatus?.bus?.bus_number} (
          {tripStatus?.bus?.model})
        </p>
        {/* <p className='flex items-center gap-2'>
          <Clock className='h-4 w-4 text-muted-foreground' />
          <span>
            Trip Duration: <strong>{timeElapsed} mins</strong>
          </span>
        </p> */}
        {tripStatus?.bus?.latitude && tripStatus?.bus?.longitude && (
          <p className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-muted-foreground' />
            <span>
              Live Location:{' '}
              <strong>
                {tripStatus.bus.latitude}, {tripStatus.bus.longitude}
              </strong>
            </span>
          </p>
        )}

        <p>
          <strong>Bus Capacity:</strong> {tripStatus?.bus?.capacity} seats
        </p>
      </CardContent>
    </Card>
  );
};

export default TripStatusCard;
