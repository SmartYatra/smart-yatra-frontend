import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface LinkItem {
  title: string;
  to: string;
}

interface INavLinksProps {
  links: Array<LinkItem>;
  onClick: () => void;
  className?: string;
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.warn(`Element with id "${id}" not found.`);
  }
};

const NavLinks = ({ links, onClick, className }: INavLinksProps) => {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  const isActive = (to: string) => pathname === to.split('/')[1];

  return (
    <>
      {links.map((link) => {
        const isHashLink = link.to.startsWith('/#');
        const linkId = link.to.slice(2);
        const isSignIn = link.title.toLowerCase() === 'sign in';

        return isHashLink ? (
          <button
            key={link.to}
            className={cn(
              'relative py-2 text-center font-medium text-secondary-foreground transition-colors duration-500 after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:text-secondary-foreground hover:after:left-0 md:mx-4 md:text-sm md:hover:after:w-full',
              isActive(link.to) && 'text-primary',
              className
            )}
            onClick={() => {
              onClick();
              scrollToSection(linkId);
            }}
          >
            {link.title}
          </button>
        ) : (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'relative py-2 text-center font-medium transition-colors duration-500 hover:text-primary md:mx-4 md:text-sm',
              {
                'rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground':
                  isSignIn,
                'text-secondary-foreground after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:left-0 hover:after:w-full':
                  !isSignIn,
              },
              isActive(link.to) && 'text-primary',
              className
            )}
            onClick={onClick}
          >
            {link.title}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
