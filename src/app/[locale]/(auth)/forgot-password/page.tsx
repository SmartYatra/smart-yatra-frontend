import Logo from '@/components/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import { Link } from '@/i18n/routing';

const ForgotPasswordPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <Card className='w-full max-w-[30rem] py-4'>
        <CardHeader className='mb-4 space-y-6'>
          <CardTitle className='flex'>
            <Logo />
          </CardTitle>

          <CardDescription className='flex flex-col gap-1'>
            <span className='text-lg text-card-foreground'>
              Forgot Your Password?
            </span>
            <span>
              No worries! Enter your email address below, and we’ll send you a
              link to reset your password.
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className='flex flex-col space-y-2.5'>
          <div className='text-center text-sm text-muted-foreground'>
            Remembered your password?{' '}
            <Link
              className='font-medium underline underline-offset-4 hover:text-primary'
              href='/signin'
            >
              Sign in
            </Link>
          </div>

          <div className='text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              className='font-medium underline underline-offset-4 hover:text-primary'
              href='/signup'
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Terms and conditions */}
      <div className='text-center text-sm text-muted-foreground'>
        By using this feature, you agree to our{' '}
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

export default ForgotPasswordPage;
