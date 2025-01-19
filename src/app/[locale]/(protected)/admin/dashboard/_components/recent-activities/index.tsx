import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  action: string;
  date: string;
  status: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <div className='mt-5'>
      <ul className='flex flex-col gap-2'>
        {activities.map(activity => (
          <Card className='p-2' key={activity.id}>
            <li className='flex items-start justify-between py-2'>
              <div>
                <p className='font-semibold'>{activity.action}</p>
                <p className='text-sm text-muted-foreground'>{activity.date}</p>
              </div>
              <span
                className={cn(
                  'w-[5.5rem] rounded-full px-2 py-0.5 text-center text-sm font-medium text-gray-950',
                  {
                    'bg-green-400': activity.status === 'Completed',
                    'bg-amber-400': activity.status === 'Ongoing',
                    'bg-blue-400': activity.status === 'Scheduled',
                  }
                )}
              >
                {activity.status}
              </span>
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
