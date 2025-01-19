import Logo from '@/components/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/routing';

import { SignupForm } from '../_components/signup-form';

const SignupPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <Card className='w-full max-w-[30rem] py-4'>
        <CardHeader className='mb-4 space-y-6'>
          <CardTitle className='flex'>
            <Logo />
          </CardTitle>

          <CardDescription className='flex flex-col gap-1'>
            <span className='text-lg text-card-foreground'>
              Join SmartYatra Today
            </span>
            <span>
              Create your account and embark on a smarter journey with us. Track
              your travels, manage fares, and enjoy seamless public transport.
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <SignupForm />
        </CardContent>

        <CardFooter className='flex flex-col space-y-2.5'>
          <div className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              className='font-medium underline underline-offset-4 hover:text-primary'
              href='/signin'
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Terms and conditions */}
      <div className='text-center text-sm text-muted-foreground'>
        By creating an account, you agree to our{' '}
        <Link
          className='font-medium underline underline-offset-4 hover:text-primary'
          href='/terms'
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          className='font-medium underline underline-offset-4 hover:text-primary'
          href='/privacy'
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};

export default SignupPage;
