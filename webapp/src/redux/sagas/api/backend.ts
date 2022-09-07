import { fetch } from "cross-fetch";
import ENVIRONMENT from "../../../utils/env";
import { isFloat } from "../../../utils/helpers";
import MOCK_DATA from "./mockData";

class MockResponse {
    status: Number;
    statusText: string;
    body: Object;

    constructor(options) {
        this.status = options.status.code;
        this.statusText = options.status.text;
        this.body = options.body;
    }

    json() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.body);
            }, 10);
        });
    }
}

const _fetchMock = (mockData, status, delay): Promise<MockResponse> => {
    return new Promise((resolve, reject) => {
        const mockResponse = new MockResponse({ status: { code: status.code, text: status.text }, body: mockData });
        setTimeout(() => {
            resolve(mockResponse);
        }, delay);
    });
}

const _fetch = (url, mockData: Object | undefined = undefined, status: Object = { text: "MOCK DATA NO ERRORS", code: 200 }, delay = 2000, logging = true) => {
    if (mockData === undefined) {
        if (logging)
            console.log("Fetching by URL...", url);
        return fetch(url);
    } else {
        if (logging)
            console.log("Fetching Mock Data", mockData);
        return _fetchMock(mockData, status, delay);
    }
}

const BACKEND = {
    sample_fetch: (lat, lon) => {
        if (!isFloat(lat) || !isFloat(lon)) {
            throw new Error("REQUEST ERROR: lat and lon need to be floats");
        }
        const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENVIRONMENT.WEATHER_API_KEY}`;

        return _fetch(fetchUrl)
    },

    fetchSenseboxesByName: (name: string) => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90&limit=4";
        if (name !== "") url += `&name=${name}`;
        return _fetch(url);
    },

    fetchSenseboxInfo: (id: string) => {
        var url = `https://api.opensensemap.org/boxes/${id}`;
        return _fetch(url, MOCK_DATA.senseboxInfoDataInactiveActiveSensors);
        //return _fetch(url);
    },

    fetchSenseboxes: () => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90";
        return _fetch(url);
    },

    fetchSenseboxDBMiscData: () => {
        var url = "https://api.opensensemap.org/stats?human=true";
        return _fetch(url, MOCK_DATA.DBMiscData);
        //return _fetch(url);
    },

};

export default BACKEND;
