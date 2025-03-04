import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TripStatusSkeleton = () => {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-6 w-32' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-2/3' />
      </CardContent>
    </Card>
  );
};

export default TripStatusSkeleton;
