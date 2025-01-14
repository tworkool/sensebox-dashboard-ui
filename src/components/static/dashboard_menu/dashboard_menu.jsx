import { Link } from "react-router-dom";
import "./dashboard_menu.scss";
import { ActionIcon, Group } from "@mantine/core";
import ThemeButton from "@components/static/theme_button/theme_button";

const DashboardMenu = (props) => {
  return (
    <nav className="dashboard-menu">
      <ul>
        <li>
          <Link to="/dashboard">
            <button>
              <span>Dashboard</span>
            </button>
          </Link>
        </li>
        <li>
          <ThemeButton size="1.3rem">
            <span>Switch Theme</span>
          </ThemeButton>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardMenu;
