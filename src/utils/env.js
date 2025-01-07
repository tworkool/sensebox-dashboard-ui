const ENVIRONMENT = {
  INFO: import.meta.env.NODE_ENV,
  MAPBOX_PUBLIC_KEY: import.meta.env.MAPBOX_PUBLIC_KEY,
  MOCK_API_DATA: import.meta.env.MOCK_API_DATA == "True" ? true : false,
  CONSOLE_LOGS: import.meta.env.CONSOLE_LOGS == "True" ? true : false,
  POSTHOG_API_TOKEN: import.meta.env.POSTHOG_API_TOKEN ?? "",
  POSTHOG_API_HOST: import.meta.env.POSTHOG_API_HOST ?? "",
};

export default ENVIRONMENT;
