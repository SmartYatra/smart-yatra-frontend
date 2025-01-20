'use client';

import { useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4'>
          <Avatar className='h-16 w-16'>
            <AvatarImage alt='User Avatar' src='/avatar-placeholder.png' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button variant='outline'>Change Avatar</Button>
        </div>
        <div className='mt-4 space-y-3'>
          <Label>Name</Label>
          <Input
            placeholder='Enter your name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Label>Email</Label>
          <Input
            placeholder='Enter your email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <Button className='mt-4'>Save Changes</Button>
      </CardContent>
    </Card>
  );
};

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Change Password</Label>
        <Input placeholder='New password' type='password' />
        <Button className='mt-4'>Update Password</Button>
        <div className='mt-4 flex items-center justify-between'>
          <span>Two-Factor Authentication</span>
          <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        </div>
      </CardContent>
    </Card>
  );
};

const PreferencesSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center justify-between'>
          <span>Dark Mode</span>
          <ThemeToggle />
        </div>
        <div className='mb-4 flex items-center justify-between'>
          <span>Email Notifications</span>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <div className='flex items-center justify-between'>
          <span>Push Notifications</span>
          <Switch
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const SettingsPage = () => {
  return (
    <div className='container mx-auto max-w-3xl p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Settings</h1>
      <Tabs className='w-full' defaultValue='profile'>
        <TabsList className='grid grid-cols-3 gap-4'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <ProfileSettings />
        </TabsContent>
        <TabsContent value='security'>
          <SecuritySettings />
        </TabsContent>
        <TabsContent value='preferences'>
          <PreferencesSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
