import { Link } from 'react-router-dom';

import AuthWrapper from '@/components/layout/auth/AuthWrapper';
import Logo from '@/components/Logo';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

import { ForgotPasswordForm } from './components';

const ForgotPassword = () => {
  return (
    <AuthWrapper
      meta={{
        title: 'Forgot Password | SmartYatra - Public Transport Digitization System',
        description: 'Forgot password to SmartYatra',
      }}
    >
      <CardHeader className="space-y-6">
        <CardTitle className="flex">
          <Logo />
        </CardTitle>

        <CardDescription className="flex flex-col gap-1">
          <span className="text-lg text-card-foreground">Forgot your password?</span>
          <span>Enter your email address and we'll send you a link to reset your password.</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ForgotPasswordForm />
      </CardContent>

      <CardFooter className="flex flex-col space-y-2.5">
        <div className="text-center text-sm text-muted-foreground">
          Remembered your password?{' '}
          <Link
            className="font-medium underline underline-offset-4 hover:text-primary"
            to={ROUTES.SIGN_IN}
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </AuthWrapper>
  );
};

export default ForgotPassword;
