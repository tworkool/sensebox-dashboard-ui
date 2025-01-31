import { RelativePathBuilder, OSEMApiClient } from "@api/api";
import { OSEM_Response_OneSenseBox, OSEM_Request_OneSenseBox } from "./types";

const getOneSenseBox = async (
  queryKey: object,
) => {
  const [_, senseBoxId] = queryKey.queryKey;
  /* return {}; */
  const path = new RelativePathBuilder("/boxes").appendUrlParam(senseBoxId).build();
  const response = await OSEMApiClient.get<OSEM_Response_OneSenseBox>(path);
  return response.data as OSEM_Response_OneSenseBox;
};

export const OSEMBoxesService = {
  getOneSenseBox,
};
