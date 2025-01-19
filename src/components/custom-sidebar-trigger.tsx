import { Menu } from 'lucide-react';

import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const CustomTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={cn('', className)} onClick={toggleSidebar}>
      <Menu size={24} />
    </button>
  );
};

export default CustomTrigger;
