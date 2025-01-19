import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface IStatsCardProps {
  id: number;
  title: string;
  value: string | number;
  Icon: React.ElementType;
}

const StatsCard = ({ id, title, value, Icon }: IStatsCardProps) => (
  <Card
    className={cn('bg-gradient-to-r backdrop-blur-sm', {
      'from-green-600 to-green-500 dark:from-emerald-600 dark:to-emerald-500':
        id === 1,
      'from-orange-500 to-orange-400 dark:from-amber-600 dark:to-amber-500':
        id === 2,
      'from-blue-600 to-blue-500': id === 3,
      'from-purple-600 to-purple-500': id === 4,
    })}
  >
    <CardHeader className='text-white'>
      <Icon className='h-8 w-8' />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className='text-2xl font-semibold text-white'>
        {value}
      </CardDescription>
    </CardContent>
  </Card>
);

export default StatsCard;
