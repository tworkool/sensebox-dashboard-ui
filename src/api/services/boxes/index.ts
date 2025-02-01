import { RelativePathBuilder, OSEMApiClient } from "@api/api";
import { OSEM_Response_OneSenseBox, OSEM_Request_OneSenseBox } from "./types";
import { useSettingsStore } from "@stores";
import dayjs from "dayjs";

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
  const reData = response.data as OSEM_Response_OneSenseBox_E;
  const boxInactiveAfter = useSettingsStore.getState()?.current?.boxInactiveAfter ?? 24;
  const isActive = dayjs().diff(dayjs(reData.updatedAt), "hours") < boxInactiveAfter;
  reData.active = isActive;
  console.log(useSettingsStore.getState());
  return reData;
};

export const OSEMBoxesService = {
  getOneSenseBox,
};
