import PageRouter from "@components/static/page_router/page_router";
import StateManager from "@components/static/state_manager/state_manager";
import { useSettingsStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { OSEMBoxesService } from "@api/services/boxes";
import { useEffect } from "react";

function App() {
  const { data, isPending } = useQuery({
    queryKey: ['OSEM_GET_ONE_BOX', "5bf8373386f11b001aae627e"],
    queryFn: async (params) => OSEMBoxesService.getOneSenseBox(params),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <StateManager />
      <PageRouter />
    </>
  )
}

export default App;
