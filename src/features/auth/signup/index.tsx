import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Logo from '@/components/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { ROUTES } from '@/constants/routes';

import { SignUpForm } from './components';

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | SmartYatra - Public Transport Digitization System</title>
        <meta content="Sign in to SmartYatra" name="description" />
      </Helmet>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <main className="flex flex-1 flex-col items-center justify-center gap-8">
          <Card className="w-full max-w-lg px-2 py-4">
            <CardHeader className="space-y-6">
              <CardTitle className="flex">
                <Logo />
              </CardTitle>

              <CardDescription className="flex flex-col gap-1">
                <span className="text-lg text-card-foreground">Sign up to SmartYatra</span>
                <span>
                  Create an account to access the full features of SmartYatra and start your
                  journey.
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <SignUpForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-2.5">
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  className="font-medium underline underline-offset-4 hover:text-primary"
                  to={ROUTES.SIGN_IN}
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
};

export default SignUp;
