import { Tabs } from "@mantine/core";
import React, { createContext, useEffect, useState, Suspense, useMemo, useLayoutEffect } from "react";
import { CubeSpinner } from "../../components/spinners";
import {
  AccessPoint,
  DeviceDesktopAnalytics,
  MapSearch,
} from "tabler-icons-react";
import DashboardBoxInfo from "../../components/dashboard_box_info";
import DashboardHeader from "../../components/dashboard_header";
import LiveAnalyticsContainer from "../../containers/live_analytics";
import "./style.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";
import { requestSenseboxInfoDataFetch } from "../../redux/actions/app_state";
import DashboardFooter from "../../components/dashboard_footer";
import CONSTANTS from "../../utils/constants";
import DetailedDataContainer from "../../containers/detailed_data";
import DashboardStartupTutorial from "../../containers/dashboard_startup_tutorial";

const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const [selectedSenseboxId, setSelectedSenseboxId] = useState();
  const [isLoadingSenseboxInfoData, setIsLoadingSenseboxInfoData] =
    useState(false);

  useEffect(() => {
    const param = search.get(CONSTANTS.ROUTING.SENSEBOX_ID);
    const lastSenseboxId = localStorage.getItem(CONSTANTS.LAST_SENSEBOX_ID);
    if (!param) {
      if (lastSenseboxId){
        //dispatch(requestSenseboxInfoDataFetch({ id: lastSenseboxId }));
        //setIsLoadingSenseboxInfoData(true);
        navigate(`/dashboard?${CONSTANTS.ROUTING.SENSEBOX_ID}=${lastSenseboxId}`);
        //search.set(CONSTANTS.ROUTING.SENSEBOX_ID, lastSenseboxId);
      } else {
        setSelectedSenseboxId(undefined);
      }
    } else {
      dispatch(requestSenseboxInfoDataFetch({ id: param }));
      setIsLoadingSenseboxInfoData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, dispatch]);

  useEffect(() => {
    if (senseboxInfoData?.validBoxId) {
      setSelectedSenseboxId(senseboxInfoData.validBoxId);
    } else {
      setSelectedSenseboxId(undefined);
    }
    setIsLoadingSenseboxInfoData(false);
  }, [senseboxInfoData]);

  return (
    <DashboardContext.Provider
      value={{ selectedSenseboxId, isLoadingSenseboxInfoData }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

const DashboardPage = () => {
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const hasSenseboxData = useMemo(() => senseboxInfoData?.data, [senseboxInfoData?.data]);

  return (
    <div className="sbd-dashboard-main">
      <DashboardHeader />
      <div className="sbd-dashboard-content">
        {hasSenseboxData && <DashboardBoxInfo />}
        <div 
          className="sbd-dashboard-content__analytics" 
          style={hasSenseboxData ? undefined : {paddingLeft: 0}}
        >
          {!hasSenseboxData &&
            <DashboardStartupTutorial/>
          }
          {hasSenseboxData &&
            <Tabs
              style={hasSenseboxData ? undefined : {paddingLeft: 0}}
              color="dark"
              radius="xs"
              defaultValue="live-analytics"
              className="sbd-mantine-tabs-root"
            >
              <Tabs.List
                position="right"
                className="sbd-dashboard-content__analytics__tab-header"
              >
                <Tabs.Tab
                  value="live-analytics"
                  color="red"
                  icon={
                    <AccessPoint size={26} strokeWidth={2} color={"#E20808"} />
                  }
                >
                  Live Data
                </Tabs.Tab>
                <Tabs.Tab
                  disabled
                  value="detailed-data"
                  icon={<DeviceDesktopAnalytics size={16} />}
                >
                  {/* Detailed Data */}
                </Tabs.Tab>
                <Tabs.Tab
                  disabled
                  value="data-map"
                  icon={<MapSearch size={16} />}
                >
                  {/* Data Map */}
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel
                value="live-analytics"
                pt="xs"
                className="sbd-mantine-tabs-panel"
              >
                <Suspense fallback={<CubeSpinner />}>
                  <LiveAnalyticsContainer />
                </Suspense>
              </Tabs.Panel>
              <Tabs.Panel
                value="detailed-data"
                pt="xs"
                className="sbd-mantine-tabs-panel"
              >
                <Suspense fallback={<CubeSpinner />}>
                  <DetailedDataContainer />
                </Suspense>
              </Tabs.Panel>
              <Tabs.Panel
                value="data-map"
                pt="xs"
                className="sbd-mantine-tabs-panel"
              >
                {/* <DataMapContainer /> */}
              </Tabs.Panel>
            </Tabs>
          }
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardPage;
export { DashboardContext, DashboardContextProvider };
