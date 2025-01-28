import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider from '@components/static/theme_provider/theme_provider';
import App from "./App";

// styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "@utils/osemicons.scss";
import "./main.scss";

const root = document.getElementById("root");
createRoot(root!).render(
  <ThemeProvider>
    <StrictMode>
      <Notifications />
      <App />
    </StrictMode>
  </ThemeProvider>
);
