import { cn } from '@/lib/utils';

interface IOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

// Mobile Menu Overlay
const Overlay = ({ isOpen, onClick }: IOverlayProps) => (
  <div
    className={cn(
      'fixed left-0 top-0 z-10 h-[100vh] w-full bg-foreground/60 transition-all duration-500 ease-in-out md:hidden',
      isOpen
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0'
    )}
    onClick={onClick}
  />
);

export default Overlay;
