import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';
import Button from '../components/ui/Button.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Badge from '../components/ui/Badge.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card.jsx';
import PageContainer from '../components/ui/PageContainer.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully.');
    } catch {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 font-sans">
      <header className="border-b border-surface-200 bg-white">
        <PageContainer maxWidth="lg" className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-surface-900">SprintBoard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden sm:inline text-sm font-semibold text-surface-700">
                {user?.name}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              loading={isLoggingOut}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </PageContainer>
      </header>

      <PageContainer maxWidth="lg" className="py-10">
        <SectionHeading
          title="Developer Workspace"
          description="SprintBoard Phase 1 auth testing ground."
          divider
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User profile card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Session Identity</CardTitle>
              <CardDescription>Verified httpOnly JWT details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center gap-4">
              <Avatar src={user?.avatar} name={user?.name} size="lg" className="shadow-md" />
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-bold text-surface-900">{user?.name}</h4>
                <p className="text-xs text-surface-500">{user?.email}</p>
              </div>
              <Badge variant={user?.role === 'admin' ? 'danger' : 'success'}>
                {user?.role || 'user'}
              </Badge>
            </CardContent>
          </Card>

          {/* Test log card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Backend Integration Health</CardTitle>
              <CardDescription>Verify cookies are secure and protected endpoints work</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-4 rounded-md border border-success-100 bg-success-50/50 text-success-800 text-xs">
                <span className="font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                  AUTHENTICATED SEAMLESSLY
                </span>
                <p className="opacity-90 leading-normal">
                  Your token has been verified against the server database. Session persistence is operational — refreshing this page triggers automatic login recovery via the secure httpOnly cookie.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-md border border-surface-200 bg-surface-50 text-surface-700 text-xs">
                <span className="font-semibold">Security Highlights:</span>
                <ul className="list-disc pl-4 space-y-1 opacity-90 leading-normal">
                  <li>No tokens are saved in LocalStorage, preventing XSS thefts.</li>
                  <li>JWT is stored entirely inside httpOnly and sameSite context cookies.</li>
                  <li>API interceptors catch, format, and report all standard backend payloads.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default Dashboard;
