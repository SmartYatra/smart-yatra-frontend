import { Route } from 'react-router-dom';

import Home from '@/features/home';

/**
 * UnAuth routes are used to define the unauth routes.
 */
const UnAuthRoutes = () => (
  <>
    <Route index element={<Home />} path="/" />
  </>
);

export default UnAuthRoutes;
