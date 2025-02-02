import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "@components/static/theme_provider/theme_provider";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const queryClient = new QueryClient();

// styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@utils/osemicons.scss";
import "./main.scss";

const root = document.getElementById("root");
createRoot(root!).render(
  <ThemeProvider>
    <StrictMode>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  </ThemeProvider>
);
