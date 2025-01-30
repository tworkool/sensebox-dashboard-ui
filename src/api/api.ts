import axios from "axios";
import { ENVIRONMENT } from "@utils/environment.js";

const osemApi = axios.create({
  baseURL: ENVIRONMENT.OSEM_API_URL,
});

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
  osemApi,
}
