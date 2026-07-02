import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants.js';
import Button from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import PageContainer from '../components/ui/PageContainer.jsx';

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col font-sans selection:bg-primary-200">
      {/* Header */}
      <header className="border-b border-surface-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <PageContainer maxWidth="lg" className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-surface-900">SprintBoard</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">Features</a>
            <a href="#about" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </PageContainer>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Gradient background decorations */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-300/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-accent-300/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          <PageContainer maxWidth="lg" className="text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-200 bg-primary-50 text-xs font-semibold text-primary-700 animate-fade-in shadow-sm select-none">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              Phase 1 Live — Foundation & Auth Secure
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 max-w-3xl leading-[1.1] sm:leading-tight">
              Manage projects with <span className="text-primary-600">Linear speed</span> and Jira power.
            </h1>

            <p className="text-base sm:text-lg text-surface-500 max-w-2xl leading-relaxed">
              SprintBoard is a modern project and task management platform for high-performance teams. Build, plan, and organize sprints through a clean, blazing fast interface.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <Link to={ROUTES.REGISTER} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  Get Started for Free
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>
          </PageContainer>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white border-y border-surface-200">
          <PageContainer maxWidth="lg">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-surface-900">
                Designed for high-velocity software squads
              </h2>
              <p className="text-sm sm:text-base text-surface-500">
                Everything you need to ship projects faster without the typical enterprise bloat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card variant="interactive">
                <CardContent className="flex flex-col gap-4 p-8">
                  <div className="h-12 w-12 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold shadow-sm select-none">
                    ⚡
                  </div>
                  <h3 className="text-lg font-bold text-surface-900">Linear Speed</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    Designed for keyboard-first navigation and sub-100ms response times. Never wait on spinner screens again.
                  </p>
                </CardContent>
              </Card>

              <Card variant="interactive">
                <CardContent className="flex flex-col gap-4 p-8">
                  <div className="h-12 w-12 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 text-xl font-bold shadow-sm select-none">
                    🎯
                  </div>
                  <h3 className="text-lg font-bold text-surface-900">Jira Power</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    Flexible planning boards, robust sprint tracking, and powerful custom workflows designed for scale.
                  </p>
                </CardContent>
              </Card>

              <Card variant="interactive">
                <CardContent className="flex flex-col gap-4 p-8">
                  <div className="h-12 w-12 rounded-lg bg-success-50 border border-success-100 flex items-center justify-center text-success-700 text-xl font-bold shadow-sm select-none">
                    🎨
                  </div>
                  <h3 className="text-lg font-bold text-surface-900">Trello Simplicity</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    Intuitive drag-and-drop boards that everyone in your organization can understand and use immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </PageContainer>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-surface-50 relative overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-100/30 blur-[100px] rounded-full pointer-events-none -z-10" />
          <PageContainer maxWidth="lg" className="text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-surface-900">
              Ready to accelerate your sprints?
            </h2>
            <p className="text-sm sm:text-base text-surface-500 max-w-xl leading-relaxed">
              Create your workspace today and experience the new standard in developer-friendly project management.
            </p>
            <div className="mt-2">
              <Link to={ROUTES.REGISTER}>
                <Button variant="primary" size="lg" className="shadow-md">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </PageContainer>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-200 py-10 mt-auto">
        <PageContainer maxWidth="lg" className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-surface-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary-600 flex items-center justify-center text-white font-black text-xs">
              S
            </div>
            <span className="font-bold text-surface-900">SprintBoard</span>
          </div>
          <p>© {new Date().getFullYear()} SprintBoard. All rights reserved.</p>
        </PageContainer>
      </footer>
    </div>
  );
};

export default Landing;
