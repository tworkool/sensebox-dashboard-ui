import { RelativePathBuilder, osemApi } from "@api/api";
import { OSEM_Response_OneSenseBox, OSEM_Request_OneSenseBox } from "./types";

const getOneSenseBox = async (
  queryKey: object,
) => {
  const [_, senseBoxId] = queryKey.queryKey;
  console.log(senseBoxId);
  /* return {}; */
  const path = new RelativePathBuilder("/boxes").appendUrlParam(senseBoxId).build();
  const response = await osemApi.get<OSEM_Response_OneSenseBox>(path);
  return response.data;
}

export const OSEMBoxesService = {
  getOneSenseBox,
}
