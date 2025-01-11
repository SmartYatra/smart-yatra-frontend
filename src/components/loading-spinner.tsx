import { cn } from '@/lib/utils';

interface ILoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: ILoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-white/50',
        className
      )}
    />
  );
};

export default LoadingSpinner;
