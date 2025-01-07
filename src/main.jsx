import React from "react";
import App from "./containers/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./redux/store";
import "./style.scss";
import "./utils/osemicons.scss";
import ENVIRONMENT from "./utils/env";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

/* import posthog from "posthog-js";
posthog.init(ENVIRONMENT.POSTHOG_API_TOKEN, {
  api_host: ENVIRONMENT.POSTHOG_API_HOST,
}); */

createRoot(document.getElementById("root")).render(
  <MantineProvider withCssVariables>
      <ReduxStoreProvider store={store}>
        <StrictMode>
          <Notifications />
          <App />
        </StrictMode>
      </ReduxStoreProvider>
  </MantineProvider>,
  root
);
