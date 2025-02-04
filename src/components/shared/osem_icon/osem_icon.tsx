import React from "react";
import { Icon } from "@iconify/react";
import { OSEM_Icon } from "@api/shared.types";

// Define the union type for valid icon names.

// Map each OSEMIcon to an Iconify icon identifier.
const iconMapping: Record<OSEM_Icon, string> = {
  "osem-radioactive": "mdi:radioactive",
  "osem-particulate-matter": "mdi:weather-fog",
  "osem-moisture": "mdi:water-percent",
  "osem-temperature-celsius": "mdi:thermometer-celsius",
  "osem-temperature-fahrenheit": "mdi:thermometer-fahrenheit",
  "osem-drops": "mdi:water",
  "osem-thermometer": "mdi:thermometer",
  "osem-windspeed": "mdi:weather-windy",
  "osem-sprinkles": "mdi:water-spray",
  "osem-brightness": "mdi:brightness-6",
  "osem-barometer": "mdi:gauge",
  "osem-humidity": "mdi:water-percent",
  "osem-not-available": "mdi:help-circle-outline",
  "osem-gauge": "mdi:gauge",
  "osem-umbrella": "mdi:weather-rainy",
  "osem-clock": "mdi:clock-outline",
  "osem-shock": "mdi:flash-outline",
  "osem-fire": "mdi:fire",
  "osem-check": "mdi:check-circle",
  "osem-close": "mdi:close-circle",
  "osem-remove": "mdi:close-circle",
  "osem-times": "mdi:close-circle",
  "osem-signal": "mdi:signal-cellular-3",
  "osem-cog": "mdi:cog",
  "osem-gear": "mdi:cog",
  "osem-trash-o": "mdi:trash-can-outline",
  "osem-download": "mdi:download",
  "osem-volume-up": "mdi:volume-high",
  "osem-register": "mdi:account-plus",
  "osem-map-marker": "mdi:map-marker",
  "osem-plus-circle": "mdi:plus-circle",
  "osem-check-circle": "mdi:check-circle",
  "osem-info-circle": "mdi:information-outline",
  "osem-twitter-square": "mdi:twitter",
  "osem-facebook-square": "mdi:facebook",
  "osem-github": "mdi:github",
  "osem-globe": "mdi:earth",
  "osem-filter": "mdi:filter",
  "osem-cloud": "mdi:cloud",
  "osem-dashboard": "mdi:view-dashboard",
  "osem-tachometer": "mdi:view-dashboard",
  "osem-spinner": "mdi:loading",
  "osem-microphone": "mdi:microphone",
  "osem-wifi": "mdi:wifi",
  "osem-battery": "mdi:battery",
  "osem-co2": "mdi:co2"
};

interface OsemIconProps {
  icon: OSEM_Icon;
}

export const OsemIcon: React.FC<OsemIconProps> = ({ icon, ...rest }) => {
  if (!iconMapping?.[icon]) return null;

  // Look up the corresponding Iconify icon identifier.
  const iconIdentifier = iconMapping[icon];

  return <Icon icon={iconIdentifier} width="1rem" height="1rem" {...rest} />;
};

export default OsemIcon;
