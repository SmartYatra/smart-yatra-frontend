import { useEffect, useState } from 'react';

import { Menu } from 'lucide-react';

import Logo from '@/components/Logo';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

import MobileMenu from './MobileMenu';
import Overlay from './MobileMenuOverlay';
import NavLinks from './NavLinks';

// Navigation links data
const NAV_LINKS = [
  { title: 'Features', to: ROUTES.FEATURES },
  { title: 'About', to: ROUTES.ABOUT },
  { title: 'Contact', to: ROUTES.CONTACT },
  { title: 'Sign In', to: ROUTES.SIGN_IN },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down a certain amount (e.g., 50px)
      setIsScrolled(window.scrollY > 50);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-background/10 py-4 backdrop-blur-[1px] transition-all',
        {
          'bg-background/90 shadow-sm backdrop-blur-md': isScrolled,
        }
      )}
    >
      <div className="max-container flex w-full items-center justify-between">
        {/* Logo */}
        <Logo />

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
        <MobileMenu closeMenu={closeMenu} isOpen={isMenuOpen} links={NAV_LINKS} />
      </div>
    </header>
  );
};

export default Header;
