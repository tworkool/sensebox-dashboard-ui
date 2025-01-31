import axios from "axios";
import { CONSTANTS, ENVIRONMENT } from "@utils/environment.js";

const OSEMApiClient = axios.create({
  baseURL: CONSTANTS.OSEM_API_URL,
});

// Add a request interceptor
/* OSEMApiClient.interceptors.request.use(
  (config) => {
    // mock api redirect
    if (ENVIRONMENT.MOCK_API_DATA) {
      console.log(config.url);
      console.log(`[MOCK API] Redirecting to mock API '${CONSTANTS.OSEM_MOCK_API_URL}'`);
      config.baseURL = CONSTANTS.OSEM_MOCK_API_URL;  // Redirect to the mock URL
    }

    return config;
  },
  (error) => {
    console.error("OSEMApiClient request interceptor error", error);
    // Handle request errors here
    return Promise.reject(error);
  }
); */

class RelativePathBuilder {
  private path: string;
  private queryParams = 0;
  private urlParams = 0;

  constructor(path: string) {
    this.path = path;
  }

  public appendUrlParam(value: string): RelativePathBuilder {
    if (!value) return this;
    if (this.path.lastIndexOf("/") !== this.path.length - 1) {
      this.path += "/";
    }
    this.path += value;
    this.urlParams++;
    return this;
  }

  public appendQueryParam(key: string, value: string): RelativePathBuilder {
    if (!value || !key) return this;
    if (this.queryParams === 0) {
      this.path += "?";
    } else {
      this.path += "&";
    }
    this.path += `${key}=${value}`;
    this.queryParams++;
    return this;
  }

  public build(): string {
    return this.path;
  }
}

export {
  RelativePathBuilder,
  OSEMApiClient,
}
