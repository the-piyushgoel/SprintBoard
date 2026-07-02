import { Outlet } from 'react-router-dom';

/**
 * Layout skeleton for authenticated pages (Dashboard, Project view).
 * Currently a placeholder shell.
 */
const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* Dashboard layout wrapper skeleton */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
