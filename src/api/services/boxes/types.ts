import { OSEM_Location, RFC3339Date, OSEM_Icon, OSEM_Exposure, OSEM_Format, OSEM_Model } from "@api/shared.types";

interface OSEM_Sensor {
  _id: string;
  lastMeasurement?: {
    value: string;
    createdAt: RFC3339Date;
  };
  sensorType: string;
  title: string;
  unit: string;
  icon?: OSEM_Icon;
}

export interface OSEM_Request_OneSenseBox {
  format?: OSEM_Format;
  senseBoxId: string;
}

export interface OSEM_Response_OneSenseBox {
  "_id": string,
  "createdAt": RFC3339Date,
  "exposure": OSEM_Exposure,
  "grouptag": string[],
  "image"?: string,
  "currentLocation": OSEM_Location,
  "name": string,
  "sensors": OSEM_Sensor[],
  "updatedAt": RFC3339Date,
  "weblink"?: string,
  "description"?: string,
}

export interface OSEM_Request_AllSenseBoxes {
  name?: string;
  limit?: number;
  date?: RFC3339Date;
  phenomenon?: string;
  format?: OSEM_Format;
  grouptag?: string;
  model?: OSEM_Model;
  classify?: boolean;
  minimal?: boolean;
  full?: boolean;
  near?: [number, number];
  maxDistance?: number;
  exposure?: OSEM_Exposure;
  bbox: [number, number, number, number]; // Order is: longitude southwest, latitude southwest, longitude northeast, latitude northeast
}

export interface OSEM_Response_SenseBox_Minimal {
  _id: string;
  name: string;
  currentLocation: OSEM_Location;
}

export type OSEM_Response_AllSenseBoxes = OSEM_Response_SenseBox_Minimal[];

// TODO!
/* export interface OSEM_Response_AllSenseBoxes extends OSEM_Response_SenseBox_Minimal {
  exposure: OSEM_Exposure;
  lastMeasurementAt: RFC3339Date;
} */
