import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants.js';
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import GuestRoute from './routes/GuestRoute.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Main application routing configuration.
 * Groups public, guest-only, and protected routes using clean layouts and outlet wrappers.
 */
function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path={ROUTES.LANDING} element={<Landing />} />

      {/* Guest-only Routes (Redirect to /dashboard if logged in) */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
      </Route>

      {/* Protected Routes (Redirect to /login if logged out) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
