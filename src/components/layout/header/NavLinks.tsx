import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface INavLinksProps {
  links: Array<{ title: string; to: string }>;
  onClick: () => void;
  className?: string;
}

const NavLinks = ({ links, onClick, className }: INavLinksProps) => {
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];
  const isActive = (to: string) => pathname === to.split('/')[1];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={cn(
            'w-20 rounded-md py-1.5 text-center font-medium hover:bg-muted md:text-sm',
            { 'bg-muted': isActive(link.to) },
            className
          )}
          onClick={onClick}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
