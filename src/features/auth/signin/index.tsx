import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Logo from '@/components/Logo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

import { SignInForm } from './components';

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Sign In | SmartYatra - Public Transport Digitization System</title>
        <meta content="Sign in to SmartYatra" name="description" />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-8">
          <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center">
                <Logo />
              </div>

              <CardDescription className="text-center">
                Public Transport Digitization System
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <SignInForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-2.5">
              <div className="text-center text-sm text-muted-foreground">
                <Link
                  className="font-medium underline underline-offset-4 hover:text-primary"
                  to={ROUTES.FORGOT_PASSWORD}
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  className="font-medium underline underline-offset-4 hover:text-primary"
                  to={ROUTES.SIGN_UP}
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
};

export default SignIn;
