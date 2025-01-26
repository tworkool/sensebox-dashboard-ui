import PageRouter from "@components/static/page_router/page_router";
import StateManager from "@components/static/state_manager/state_manager";
import { useSettingsStore } from "@stores";

function App() {

  return (
    <>
      <StateManager />
      <PageRouter />
    </>
  )
}

export default App;
