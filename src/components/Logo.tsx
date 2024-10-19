import { Link } from 'react-router-dom';

import LogoImg from '@/assets/logo.png';
import { cn } from '@/lib/utils';

interface ILogoProps {
  className?: string;
  wrapperClassName?: string;
}

const Logo = ({ className, wrapperClassName }: ILogoProps) => {
  return (
    <Link className={wrapperClassName} to="/">
      <img alt="SmartYatra" className={cn('w-36', className)} src={LogoImg} />
    </Link>
  );
};

export default Logo;
