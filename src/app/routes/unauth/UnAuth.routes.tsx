import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { About, Home } from '@/features/passenger';
import Contact from '@/features/passenger/contact';

/**
 * UnAuth routes are used to define the unauth routes.
 */
const UnAuthRoutes = () => (
  <>
    <Route index element={<Home />} path={ROUTES.HOME} />
    <Route element={<About />} path={ROUTES.ABOUT} />
    <Route element={<Contact />} path={ROUTES.CONTACT} />
  </>
);

export default UnAuthRoutes;
