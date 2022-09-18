import {
  failWeatherDataFetch,
  requestWeatherDataFetch,
  succeedWeatherDataFetch,

  requestSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedSenseboxesDataFetch,

  requestSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
  succeedSenseboxInfoDataFetch,

  requestSenseboxDBMiscDataFetch,
  failSenseboxDBMiscDataFetch,
  succeedSenseboxDBMiscDataFetch,
  
  requestSenseboxSensorDataFetch,
  failSenseboxSensorDataFetch,
  succeedSenseboxSensorDataFetch,

  requestGeocodingDataFetch,
  failGeocodingDataFetch,
  succeedGeocodingDataFetch,
} from "../actions/app_state";
import { combineActions, handleActions } from "redux-actions";
import { actionReducer } from "./utils/reducers";

const appStateInit = {
  weatherData: {},
  senseboxesData: {isLoading: true, data: undefined},
  senseboxInfoData: {isLoading: true, data: undefined},
  senseboxDBMiscData: {data: undefined},
  senseboxSensorData: {},
  geocodingData: {}
};

// combine all actions here
const appStateAction = combineActions(
  requestWeatherDataFetch,
  failWeatherDataFetch,
  succeedWeatherDataFetch,

  requestSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedSenseboxesDataFetch,

  requestSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
  succeedSenseboxInfoDataFetch,

  requestSenseboxDBMiscDataFetch,
  failSenseboxDBMiscDataFetch,
  succeedSenseboxDBMiscDataFetch,

  requestSenseboxSensorDataFetch,
  failSenseboxSensorDataFetch,
  succeedSenseboxSensorDataFetch,

  requestGeocodingDataFetch,
  failGeocodingDataFetch,
  succeedGeocodingDataFetch,
);

// create reducer from one combined actiontype
const appStateReducer = handleActions(
  { [appStateAction]: actionReducer },
  appStateInit
);

export { appStateReducer, appStateInit };
