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

const theme = createTheme({});

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
