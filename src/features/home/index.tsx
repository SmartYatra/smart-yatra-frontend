import { Link } from 'react-router-dom';

import { Car, Key, LogIn, Shield, User, UserPlus } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

interface IHomeLinkProps {
  to: string;
  Icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}

const HomeLink = ({ to, Icon, title, description, iconColor }: IHomeLinkProps) => (
  <Link
    className="flex transform flex-col items-center justify-center rounded-md border border-gray-300 bg-white p-6 text-center shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    to={to}
  >
    <Icon className={`mb-2 h-10 w-10 ${iconColor}`} />
    <h2 className={`text-3xl font-semibold ${iconColor}`}>{title}</h2>
    <p className="mt-2 text-gray-500">{description}</p>
  </Link>
);

const Home = () => {
  const links = [
    {
      to: ROUTES.PASSENGER_HOME,
      Icon: User,
      title: 'Passenger Home',
      description: 'Access your trip history and manage bookings.',
      iconColor: 'text-blue-600',
    },
    {
      to: ROUTES.DRIVER_HOME,
      Icon: Car,
      title: 'Driver Home',
      description: 'Manage your routes and earnings.',
      iconColor: 'text-green-600',
    },
    {
      to: ROUTES.ADMIN_HOME,
      Icon: Shield,
      title: 'Admin Home',
      description: 'Oversee operations and manage users.',
      iconColor: 'text-purple-600',
    },
    {
      to: ROUTES.SIGN_IN,
      Icon: LogIn,
      title: 'Sign In',
      description: 'Access your account.',
      iconColor: 'text-yellow-600',
    },
    {
      to: ROUTES.SIGN_UP,
      Icon: UserPlus,
      title: 'Sign Up',
      description: 'Create a new account.',
      iconColor: 'text-red-600',
    },
    {
      to: ROUTES.FORGOT_PASSWORD,
      Icon: Key,
      title: 'Forgot Password',
      description: 'Reset your password.',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="mb-8 text-6xl font-extrabold text-gray-800">Welcome to Smart Yatra</h1>
      <p className="mb-10 text-xl text-gray-600">Choose your role to get started:</p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => (
          <HomeLink key={index} {...link} />
        ))}
      </div>
    </div>
  );
};

export default Home;
