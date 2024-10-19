import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'lucide-react';

import { Button } from '@/components/ui';

import MobileMenu from './MobileMenu';
import Overlay from './MobileMenuOverlay';
import NavLinks from './NavLinks';

// Navigation links data
const NAV_LINKS = [
  { title: 'Home', to: '/' },
  { title: 'Services', to: '/services' },
  { title: 'About', to: '/about' },
  { title: 'Contact', to: '/contact' },
  { title: 'Sign In', to: '/auth/signin' },
  { title: 'Sign Up', to: '/auth/signup' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-background/90 py-4 shadow-sm backdrop-blur-md">
      <div className="max-container flex w-full items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center justify-center" to="/">
          <p className="text-xl font-semibold">SmartYatra</p>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks links={NAV_LINKS} onClick={closeMenu} />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          aria-label="Toggle navigation menu"
          className="cursor-pointer p-2 md:hidden"
          variant="ghost"
          onClick={toggleMenu}
        >
          <Menu className="size-6" />
        </Button>

        {/* Mobile Menu and Overlay */}
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        <MobileMenu
          closeMenu={closeMenu}
          isOpen={isMenuOpen}
          links={NAV_LINKS}
        />
      </div>
    </header>
  );
};
export default Header;
