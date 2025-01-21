import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import DashboardMenu from '@components/static/dashboard_menu/dashboard_menu';
import "./dashboard.scss";
import { useMemo } from "react";
import { Icon } from "@iconify/react";

const Dashboard = () => {
  const location = useLocation();
  const dashboardPath = useMemo(() => {
    const path = location.pathname.replace("/dashboard", "");
    return path ? path.split("/").filter(i => i) : null;
  }, [location.pathname]);

  return <div className="dashboard">
    <DashboardMenu />
    <div className="dashboard__header">
      Dashboard
      {dashboardPath && dashboardPath.map((path, index) => 
        <React.Fragment key={index}>
          <Icon icon="tabler:chevron-right" width="1rem" height="1rem"></Icon>
          <span style={{ textTransform: "capitalize" }}>
            {path}
          </span>
        </React.Fragment>
      )}
    </div>
    <div className="dashboard__content">
      <Outlet />
    </div>
  </div>
};

export default Dashboard;