import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Bus } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { ForgotPasswordForm } from './components';

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>
          Forgot Password | SmartYatra - Public Transport Digitization System
        </title>
        <meta content="Forgot password to SmartYatra" name="description" />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-8">
          <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1">
              <Link
                className="flex items-center justify-center space-x-2"
                to="/"
              >
                <Bus className="h-6 w-6 text-green-600" />
                <CardTitle className="text-center text-2xl font-bold">
                  SmartYatra
                </CardTitle>
              </Link>

              <CardDescription className="text-center">
                Public Transport Digitization System
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

export default ForgotPassword;
