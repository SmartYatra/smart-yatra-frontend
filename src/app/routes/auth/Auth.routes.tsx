import { Navigate, Route } from 'react-router-dom';

import { ForgotPassword, SignIn, SignUp } from '@/features/auth';

// import { ForgotPassword, SignIn, SignUp } from '@/features/auth';

/**
 * Auth routes are used to define the auth routes.
 */
const AuthRoutes = () => (
  <Route path="auth">
    <Route index element={<Navigate to={'/signin'} />} path="" />
    <Route element={<SignIn />} path="signin" />
    <Route element={<SignUp />} path="signUp" />
    <Route element={<ForgotPassword />} path="forgot-password" />
  </Route>
);

export default AuthRoutes;
