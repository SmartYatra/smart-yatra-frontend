import { Link, useRouteError } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import { Button } from '../ui/button';

/**
 * NotFound page component is rendered when the route is not found.
 */
const NotFound = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 text-center"
      id="error-page"
    >
      <h1 className=" md:leading-14 pb-8  pt-6 text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-8xl">
        404
      </h1>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry, we couldn't find this page.
        </p>
        <p className="mb-8">
          Please head back to the homepage or contact us if you think this is an error.
        </p>

        <Link to={ROUTES.HOME}>
          <Button className="group min-w-48 gap-3 border py-6" variant="ghost">
            <ArrowLeft className="transition-all duration-300 group-hover:-translate-x-1" /> Back to
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
