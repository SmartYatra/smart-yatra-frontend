import { cn } from '@/lib/utils';

interface ISkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: ISkeletonProps) => {
  return <div className={cn('animate-pulse rounded-lg bg-muted p-4', className)} />;
};

export default Skeleton;
