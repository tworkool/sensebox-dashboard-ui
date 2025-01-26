import { MantineProvider, createTheme, localStorageColorSchemeManager } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CONSTANTS } from "@utils/environment.js";
import App from "./App";

// styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "@utils/osemicons.scss";
import "./main.scss";

const theme = createTheme({
  "colors": {
    "dynamicPrimary": [ // JUST A PLACEHOLDER
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
    ],
  },
  "primaryColor": "green", // TODO: change this in settings
  "defaultRadius": "sm",
  "fontFamily": "Satoshi-Regular, Inter, Arial, system-ui, sans-serif",
  "primaryShade": { light: 6, dark: 8 },
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: CONSTANTS.THEME_LOCALSTORAGE_KEY,
});

const root = document.getElementById("root");
createRoot(root!).render(
  <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} withCssVariables>
    <StrictMode>
      <Notifications />
      <App />
    </StrictMode>
  </MantineProvider>
);
