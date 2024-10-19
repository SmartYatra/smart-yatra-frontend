import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const Footer = () => (
  <footer className="w-full border-t py-6 text-center text-xs text-gray-500">
    <div className="max-container flex items-center justify-between">
      <p>© 2024 SmartYatra. All rights reserved.</p>
      <div className="flex justify-center gap-4">
        <Link className="hover:underline" to={ROUTES.TERMS_OF_SERVICE}>
          Terms of Service
        </Link>
        <Link className="hover:underline" to={ROUTES.PRIVACY_POLICY}>
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
