import { Outlet } from 'react-router-dom';

/**
 * Layout skeleton for authentication pages (Login, Register).
 * Currently a placeholder shell.
 */
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Auth layout wrapper skeleton */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
