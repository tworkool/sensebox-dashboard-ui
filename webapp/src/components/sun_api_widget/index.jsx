import { Card, Group, LoadingOverlay, Text, Tooltip } from "@mantine/core";
import React from "react";
import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
  AccessPoint,
  Clock,
  MapPin,
  Sunrise,
  Sunset,
} from "tabler-icons-react";
import QUERY_DATA_MODIFIERS from "../../redux/sagas/api/query_data_modifiers";
import {
  getGeocodingData,
  getSunApiData,
} from "../../redux/selectors/appState";
import moment from "moment";
import "./style.scss";
import { getFormattedHoursStringFromSeconds } from "../../utils/helpers";

const SunApiWidget = (props) => {
  const sunApiData = useSelector(getSunApiData);
  const geocodingData = useSelector(getGeocodingData);
  const [aggregatedSunApiData, setAggregatedSunApiData] = useState();
  /* const [liveTime, setLiveTime] = useState(
    moment("17.10.2022 17:05:03", "DD.MM.YYYY HH:mm:ss")
  ); */
  const [sunApiDataActiveDate, setSunApiDataActiveDate] = useState();
  const [liveTime, setLiveTime] = useState(moment().local());

  useEffect(() => {
    setInterval(() => {
      setLiveTime(moment());
    }, 1000 * 60); // 1000ms*60 = 60s = 1min
    /* setInterval(() => {
      setLiveTime((old) => {
        const ret = moment(old).add(15, "minutes");
        return ret;
      });
    }, 1000); // 1000ms*60*10 = 60s * 10 = 1min * 10 = 10min */
  }, []);

  // live data refetch
  /*   useEffect(() => {
    console.log(geocodingData);
    if (
      sunApiDataActiveDate &&
      geocodingData?.data?.coordinates &&
      liveTime.isAfter(sunApiDataActiveDate, "day")
    ) {
      // refetch data for new day in case the day is over
      setTimeout(() => {
        dispatch(
          requestSunApiDataFetch({
            lat: geocodingData.data.coordinates[1],
            lon: geocodingData.data.coordinates[0],
          })
        );
      }, 5000);
      setSunApiDataActiveDate(liveTime.add(1, "days")); // Fix to not refetch infinitly!
    }
  }, [sunApiDataActiveDate, dispatch, liveTime, geocodingData]); */

  useEffect(() => {
    if (!sunApiData?.data) {
      setAggregatedSunApiData(undefined);
      return;
    }
    const aggregatedData = QUERY_DATA_MODIFIERS.aggregateSunApiData(
      sunApiData.data
    );
    setAggregatedSunApiData(aggregatedData);
    setSunApiDataActiveDate(aggregatedData?.astronomical_twilight_end);
  }, [sunApiData]);

  const locationGeocodingElement = useCallback(() => {
    const geoCodingLocation = geocodingData?.data?.locationCoarse
      ? geocodingData.data.locationCoarse
      : geocodingData?.data?.locationExact;
    return (
      <Tooltip
        multiline
        width={300}
        label={geocodingData?.data?.attribution}
        disabled={!geocodingData?.data?.attribution}
      >
        <Group spacing="xs">
          <MapPin size={22} strokeWidth={1.5} color={"black"} />
          <Text>
            {geoCodingLocation ? geoCodingLocation : "At SenseBox Location"}
          </Text>
        </Group>
      </Tooltip>
    );
  }, [geocodingData]);

  const widgetDataGridSectionElement = useCallback(
    (title, logo, value, subValue = undefined) => {
      return (
        <div className="sbd-sun-api-widget__data-content__info-field">
          <Group spacing="xs">
            {logo}
            <Text weight={500}>{title}</Text>
          </Group>
          <Text>{value}</Text>
          {subValue && (
            <Text size={"sm"} color="dimmed">
              {subValue}
            </Text>
          )}
        </div>
      );
    },
    []
  );

  return (
    <Card shadow="xs" radius="lg" p="lg" className="sbd-sun-api-widget">
      <Card.Section withBorder inheritPadding py="xs">
        <Group spacing="xs">
          {/*  <Temperature /> */}
          <Text size="xl" weight={500}>
            Sunset/Sunrise Times
          </Text>
          <Text size="xs" color={"dimmed"}>
            More Info on https://sunrise-sunset.org/
          </Text>
        </Group>
      </Card.Section>
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        style={{ minHeight: 100 }}
      >
        <LoadingOverlay
          visible={!aggregatedSunApiData}
          transitionDuration={1000}
          overlayOpacity={1}
          overlayBlur={2}
          loaderProps={{ color: "dark", variant: "dots" }}
        />
        <Group position="apart" spacing="xs">
          {locationGeocodingElement()}
          <Group spacing="xs">
            <Clock size={22} strokeWidth={1.5} color={"black"} />
            <Text weight={500}>Local Time</Text>
            <Text>{liveTime.format("HH:mm")}</Text>
          </Group>
        </Group>
        <div
          className={`sbd-sun-api-widget__data-content ${
            aggregatedSunApiData
              ? ""
              : "sbd-sun-api-widget__data-content--hidden"
          }`}
        >
          {aggregatedSunApiData && (
            <div className="sbd-sun-api-widget__data-content__grid">
              {widgetDataGridSectionElement(
                "Sunrise",
                <Sunrise size={18} strokeWidth={2} color={"black"} />,
                aggregatedSunApiData.sunrise.format("HH:mm"),
                aggregatedSunApiData.sunrise.fromNow()
              )}
              {widgetDataGridSectionElement(
                "Sunset",
                <Sunset size={18} strokeWidth={2} color={"black"} />,
                aggregatedSunApiData.sunset.format("HH:mm"),
                aggregatedSunApiData.sunset.fromNow()
              )}
              {widgetDataGridSectionElement(
                "Twilight Start (Morning)",
                null,
                aggregatedSunApiData.astronomical_twilight_begin.format(
                  "HH:mm"
                ),
                aggregatedSunApiData.astronomical_twilight_begin.fromNow()
              )}
              {widgetDataGridSectionElement(
                "Twilight End (Evening)",
                null,
                aggregatedSunApiData.astronomical_twilight_end.format("HH:mm"),
                aggregatedSunApiData.astronomical_twilight_end.fromNow()
              )}
              {widgetDataGridSectionElement(
                "Day Length",
                null,
                getFormattedHoursStringFromSeconds(
                  aggregatedSunApiData.day_length
                )
              )}
            </div>
          )}
        </div>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <Group spacing="xs">
          <Text size="xs" weight={600} color="red">
            {`Today (${liveTime.format("MMMM Do YYYY")})`}
          </Text>
          <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
        </Group>
      </Card.Section>
    </Card>
  );
};
export default SunApiWidget;
