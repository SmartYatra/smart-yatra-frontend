import { Helmet } from 'react-helmet-async';

import { Footer, Header } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { NotificationSettings, PasswordForm, ProfileForm } from './components';

const Settings = () => (
  <>
    <Helmet>
      <title>Settings - SmartYatra</title>
      <meta content="Manage your SmartYatra account settings and preferences" name="description" />
    </Helmet>
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold">Account Settings</h1>
          <Tabs className="space-y-4" defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>
            <TabsContent value="password">
              <PasswordForm />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Settings;
