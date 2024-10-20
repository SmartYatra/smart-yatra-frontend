import { useState } from 'react';

import { Lock } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const PasswordForm = () => {
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change requested:', password);
    toast.success('Your password has been successfully updated.');
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Ensure your account is using a strong password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                required
                id="current-password"
                type="password"
                value={password.current}
                onChange={(e) => {
                  setPassword({ ...password, current: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                required
                id="new-password"
                type="password"
                value={password.new}
                onChange={(e) => {
                  setPassword({ ...password, new: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                required
                id="confirm-password"
                type="password"
                value={password.confirm}
                onChange={(e) => {
                  setPassword({ ...password, confirm: e.target.value });
                }}
              />
            </div>
          </div>
          <Button className="mt-4" type="submit">
            Change Password
            <Lock className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
