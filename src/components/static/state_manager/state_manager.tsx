import { useSettingsStore } from "@stores";
import { useLayoutEffect } from "react";
import { useThemeStore } from "@components/static/theme_provider/theme_provider";

const StateManager = () => {
  const { current: currentSettings } = useSettingsStore();
  const { updateTheme } = useThemeStore();

  useLayoutEffect(() => {
    /* document.documentElement.style.setProperty('--primary-color', currentSettings.primaryDashboardColor); */
    updateTheme({
      colors: {
        "dynamicPrimary": [
          currentSettings.primaryDashboardColor, // use the same color for all shades for simplicity
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
          currentSettings.primaryDashboardColor,
        ]
      },
      primaryColor: "dynamicPrimary",
    });
  }, [currentSettings, updateTheme]);

  return null;
};

export default StateManager;
