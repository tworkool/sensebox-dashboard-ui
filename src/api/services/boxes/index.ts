import { RelativePathBuilder, OSEMApiClient } from "@api/api";
import { OSEM_Response_OneSenseBox, OSEM_Request_OneSenseBox } from "./types";
import { useSettingsStore } from "@stores";
import dayjs from "dayjs";
import tzlookup from "tz-lookup";

export interface OSEM_Response_OneSenseBox_E extends OSEM_Response_OneSenseBox {
  active: boolean;
}

const getOneSenseBox = async (
  queryKey: object,
) => {
  const [_, senseBoxId] = queryKey.queryKey;
  /* return {}; */
  const path = new RelativePathBuilder("/boxes").appendUrlParam(senseBoxId).build();
  const response = await OSEMApiClient.get<OSEM_Response_OneSenseBox>(path);

  // prepare data
  // active status
  const reData = response.data as OSEM_Response_OneSenseBox_E;
  const boxInactiveAfter = useSettingsStore.getState()?.current?.boxInactiveAfter ?? 24;
  const isActive = dayjs().diff(dayjs(reData.updatedAt), "hours") < boxInactiveAfter;
  reData["active"] = isActive;

  // append timezone
  reData["updatedAt"] = dayjs(reData["updatedAt"]).utc();
  reData["createdAt"] = dayjs(reData["createdAt"]).utc();
  try {
    const ianaTzCode = tzlookup(reData.currentLocation.coordinates[1], reData.currentLocation.coordinates[0]);
    console.log(ianaTzCode);
    reData["updatedAt"] = reData["updatedAt"].tz(ianaTzCode);
    reData["createdAt"] = reData["createdAt"].tz(ianaTzCode);
  } catch (e) {
    console.warn(`Could not determine timezone for senseBox: ${e}`, senseBoxId);
  }

  console.log(dayjs(reData["createdAt"]).local().format());

  return reData;
};

export const OSEMBoxesService = {
  getOneSenseBox,
};
