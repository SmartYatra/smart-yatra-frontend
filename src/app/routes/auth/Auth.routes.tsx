import { Navigate, Route } from 'react-router-dom';

import { AuthLayout } from '@/components/layout';
import { ROUTES } from '@/constants/routes';
import { ForgotPassword, SignIn, SignUp } from '@/features/auth';

// import { ForgotPassword, SignIn, SignUp } from '@/features/auth';

/**
 * Auth routes are used to define the auth routes.
 */
const AuthRoutes = () => (
  <Route element={<AuthLayout />} path={ROUTES.AUTH.ROOT}>
    <Route index element={<Navigate to={ROUTES.AUTH.SIGN_IN} />} path="" />
    <Route element={<SignIn />} path={ROUTES.AUTH.SIGN_IN} />
    <Route element={<SignUp />} path={ROUTES.AUTH.SIGN_UP} />
    <Route element={<ForgotPassword />} path={ROUTES.AUTH.FORGOT_PASSWORD} />
  </Route>
);

export default AuthRoutes;
