import { useSettingsStore } from "@stores";
import { useLayoutEffect } from "react";
import { useMantineTheme } from "@mantine/core";

const StateManager = () => {
  const { current: currentSettings } = useSettingsStore();
  const theme = useMantineTheme();

  useLayoutEffect(() => {
    console.log("PRIMARY COLOR");
    /* document.documentElement.style.setProperty('--primary-color', currentSettings.primaryDashboardColor); */
    theme.colors["dynamicPrimary"] = [
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
    ];
    theme.primaryColor = "dynamicPrimary";
    console.log(theme);
  }, [currentSettings, theme]);

  return null;
};

export default StateManager;
