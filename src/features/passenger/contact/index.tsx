import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';

import BusOnRoadImg from '@/assets/bus-on-road.jpg';
import { Footer, Header } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message });
    toast.success("We've received your message and will get back to you soon.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Contact SmartYatra - Get in Touch</title>
        <meta
          content="Contact SmartYatra for support, feedback, or partnership inquiries"
          name="description"
        />
      </Helmet>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">
          <div className="relative bg-gradient-to-r from-primary to-primary-foreground py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="mb-4 text-center text-4xl font-bold">Contact Us</h1>
              <p className="mx-auto max-w-3xl text-center text-xl">
                We're here to help! Reach out to us for support, feedback, or partnership inquiries.
              </p>
            </div>
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                alt="City skyline"
                className="pointer-events-none size-full object-cover object-top opacity-20"
                src={BusOnRoadImg}
              />
            </div>
          </div>

          <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      required
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      required
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      required
                      className="min-h-[150px]"
                      id="message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
              <div>
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-primary" />
                        Email Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <a
                          className="text-primary hover:underline"
                          href="mailto:support@smartyatra.com"
                        >
                          support@smartyatra.com
                        </a>
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-primary" />
                        Call Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <a className="text-primary hover:underline" href="tel:+1234567890">
                          +1 (234) 567-890
                        </a>
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-primary" />
                        Visit Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        123 SmartYatra Street,
                        <br />
                        Tech Hub, Innovation City,
                        <br />
                        Mobility State 12345
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
