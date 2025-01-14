import { Outlet } from "react-router-dom";
import DashboardMenu from '@components/static/dashboard_menu/dashboard_menu';
import "./dashboard.scss";

const Dashboard = () => {
  return <div className="dashboard">
    <DashboardMenu />
    <div className="dashboard__content">
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  </div>
};

export default Dashboard;