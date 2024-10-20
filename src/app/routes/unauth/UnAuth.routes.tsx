import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { About, Contact, Home, Settings } from '@/features/passenger';

/**
 * UnAuth routes are used to define the unauth routes.
 */
const UnAuthRoutes = () => (
  <>
    {/* Unprotected Routes */}
    <Route index element={<Home />} path={ROUTES.HOME} />
    <Route element={<About />} path={ROUTES.ABOUT} />
    <Route element={<Contact />} path={ROUTES.CONTACT} />

    {/* Protected Routes */}
    <Route element={<Settings />} path={ROUTES.SETTINGS} />
  </>
);

export default UnAuthRoutes;
