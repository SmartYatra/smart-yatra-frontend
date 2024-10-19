import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full border-t py-6 text-center text-xs text-gray-500">
    <div className="max-container flex items-center justify-between">
      <p>© 2024 SmartYatra. All rights reserved.</p>
      <div className="flex justify-center gap-4">
        <Link className="hover:underline" to="#">
          Terms of Service
        </Link>
        <Link className="hover:underline" to="#">
          Privacy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
