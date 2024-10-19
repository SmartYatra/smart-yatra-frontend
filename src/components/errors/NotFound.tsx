import { Link, useRouteError } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import { Button } from '../ui/button';

/**
 * NotFound page component is rendered when the route is not found.
 */
export default function NotFound() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    // <div
    // 	className="flex min-h-screen flex-col items-center justify-center gap-6 text-center"
    // 	id="error-page"
    // >
    // 	<div className="flex flex-col items-center text-rose-600">
    // 		{/* <img src={'/src/assets/not-found.svg'} alt="404" /> */}
    // 		<h1 className="-mt-6 text-[7rem] font-medium">404</h1>
    // 		<h2 className="text-xl font-medium">
    // 			Oops, looks like this page isn’t feeling well.
    // 		</h2>
    // 		<p className="mt-2">We’ll help you get back to the right path.</p>
    // 		<p>
    // 			<i>{error && (error.statusText || error.message)}</i>
    // 		</p>
    // 	</div>
    // <Link to={'/'}>
    // 	<Button className="min-w-48 gap-3 group" size="lg" variant="ghost">
    // 		<ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" />{' '}
    // 		Back to Home
    // 	</Button>
    // </Link>
    // </div>
    <>
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

          <Link to={'/'}>
            <Button className="group min-w-48 gap-3 border py-6" variant="ghost">
              <ArrowLeft className="transition-all duration-300 group-hover:-translate-x-1" /> Back
              to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
