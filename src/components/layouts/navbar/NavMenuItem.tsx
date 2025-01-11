import { useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export interface IRouteList {
  name: string;
  href?: string;
  subMenu?: IRouteList[];
  icon?: React.ReactNode;
  description?: string;
}

const NavMenuItem = ({ item }: { item: IRouteList }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {item.href ? (
          <Link
            aria-label={item.name}
            className='px-3 text-[15px] text-secondary-foreground transition-colors hover:bg-transparent hover:text-primary'
            href={item.href}
          >
            {item.icon}
            {item.name}
          </Link>
        ) : (
          <Button
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-label={`Open ${item.name} submenu`}
            className='px-3 text-[15px] text-secondary-foreground transition-colors hover:bg-transparent hover:text-primary'
            variant='ghost'
          >
            {item.name}
            {item.subMenu && (
              <ChevronDown
                className={`mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                size={18}
              />
            )}
          </Button>
        )}
      </PopoverTrigger>

      {item.subMenu && (
        <PopoverContent
          align='center'
          className='w-full min-w-72 px-2.5 py-1.5'
        >
          {item.subMenu.map((subItem, subIndex) => (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className='[&:not(:last-child)]:mb-2'
              initial={{ opacity: 0, scale: 0.95 }}
              key={subIndex}
              transition={{ duration: 0.2, delay: subIndex * 0.1 }}
            >
              {subItem.href ? (
                <Link
                  aria-label={subItem.description}
                  href={subItem.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-auto w-full flex-col items-start justify-start gap-1 p-4'
                  )}
                >
                  <div className='flex items-center gap-2 text-base'>
                    {subItem.icon}
                    {subItem.name}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {subItem.description}
                  </p>
                </Link>
              ) : (
                <Button
                  aria-label={subItem.description}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-auto w-full flex-col items-start justify-start gap-1 p-4'
                  )}
                >
                  <div className='flex items-center gap-2 text-base'>
                    {subItem.icon}
                    {subItem.name}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {subItem.description}
                  </p>
                </Button>
              )}
            </motion.div>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default NavMenuItem;
