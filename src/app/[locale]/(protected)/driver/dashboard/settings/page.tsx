'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('John Doe');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveChanges = () => {
    // Handle save logic (e.g., API request to save settings)
    console.log('Settings saved');
  };

  return (
    <div className='space-y-6 py-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Settings</h1>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium' htmlFor='name'>
                Name
              </label>
              <Input
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-medium' htmlFor='email'>
                Email
              </label>
              <Input
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <span className='text-sm'>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <span className='text-sm'>Enable Notifications</span>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <Button
              variant='outline'
              onClick={() => console.log('Reset Password')}
            >
              Reset Password
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Delete Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => console.log('Account Deleted')}
                >
                  Confirm Deletion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className='flex justify-end'>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
