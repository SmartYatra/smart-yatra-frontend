import { Link } from 'react-router-dom';

import { X } from 'lucide-react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

import NavLinks from './NavLinks';

interface IMobileMenuProps {
  isOpen: boolean;
  links: Array<{ title: string; to: string }>;
  closeMenu: () => void;
}

// Mobile Menu Component
const MobileMenu = ({ isOpen, links, closeMenu }: IMobileMenuProps) => (
  <div
    className={cn(
      'fixed left-0 top-0 z-20 h-[85vh] w-full transform-gpu bg-background shadow-lg transition-transform duration-500 ease-in-out md:hidden',
      isOpen ? 'translate-y-0' : '-translate-y-full'
    )}
  >
    <div className="max-container flex w-full items-center justify-between py-4">
      {/* Logo */}
      <Link className="flex items-center justify-center" to="/">
        <p className="text-xl font-semibold">Logo</p>
      </Link>

      {/* Close Button */}
      <Button
        aria-label="Close menu"
        className="p-2"
        variant="ghost"
        onClick={closeMenu}
      >
        <X className="size-6 cursor-pointer" />
      </Button>
    </div>

    {/* Mobile Navigation Links */}
    <nav className="flex flex-col items-start gap-5 px-5 pt-10">
      <NavLinks
        className="w-full px-2 py-3 text-start"
        links={links}
        onClick={closeMenu}
      />
    </nav>
  </div>
);

export default MobileMenu;
