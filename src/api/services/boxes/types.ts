import { OSEM_Location, RFC3339Date, OSEM_Icon } from "@api/shared.types";

export interface OSEM_Request_OneSenseBox {
  format?: "json" | "geojson";
  senseBoxId: string;
}

interface OSEM_Sensor {
  _id: string;
  lastMeasurement: {
    value: string;
    createdAt: RFC3339Date;
  };
  sensorType: string;
  title: string;
  unit: string;
  icon?: OSEM_Icon;
}

export interface OSEM_Response_OneSenseBox {
  "_id": string,
  "createdAt": RFC3339Date,
  "exposure": "outdoor" | "indoor",
  "grouptag": string[],
  "image"?: string,
  "currentLocation": OSEM_Location,
  "name": string,
  "sensors": OSEM_Sensor[],
  "updatedAt": RFC3339Date,
  "weblink"?: string,
  "description"?: string,
}