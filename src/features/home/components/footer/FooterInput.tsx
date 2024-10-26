import { FormEvent, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui';
import { Button } from '@/components/ui/button';

const FooterInput = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
    } else {
      toast.success('Thank you for subscribing to our newsletter.');
      setEmail('');
    }
  };

  return (
    <form
      className="relative w-full text-secondary-foreground/90 md:w-[80%]"
      onSubmit={handleSubmit}
    >
      <Input
        className="h-14 rounded-2xl bg-background/10 px-2 text-xl text-background/80 backdrop-blur-md md:p-5"
        name="email"
        placeholder="Your Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        aria-label="Subscribe to newsletter"
        className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full p-2"
        type="submit"
        variant={'ghost'}
      >
        <ArrowRight className="h-7 w-7 cursor-pointer text-background" />
      </Button>
    </form>
  );
};

export default FooterInput;
