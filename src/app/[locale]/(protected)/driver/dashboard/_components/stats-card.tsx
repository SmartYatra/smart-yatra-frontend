import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface IStatsCardProps {
  id: number;
  title: string;
  value: string | number;
  Icon: React.ElementType;
}

const StatsCard = ({ title, value, Icon }: IStatsCardProps) => (
  <Card className='bg-muted'>
    <CardHeader>
      <Icon className='h-8 w-8' />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className='text-xl'>{value}</CardDescription>
    </CardContent>
  </Card>
);

export default StatsCard;
