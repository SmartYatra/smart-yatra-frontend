import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactInformation = () => (
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
          <a className="text-primary hover:underline" href="mailto:support@smartyatra.com">
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
);
