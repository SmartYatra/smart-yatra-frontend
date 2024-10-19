import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Logo from '@/components/Logo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui';

import { SignUpForm } from './components';

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | SmartYatra - Public Transport Digitization System</title>
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
              <SignUpForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-2.5">
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  className="font-medium underline underline-offset-4 hover:text-primary"
                  to="/auth/signin"
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
