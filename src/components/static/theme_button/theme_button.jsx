import { Icon } from '@iconify/react';
import { useMantineColorScheme } from '@mantine/core';
import { CONSTANTS } from '@utils/environment';
import { useEffect, useMemo, useState } from 'react';

const themeOptions = ["dark", "light"]; // "auto"

const getInitialColorScheme = () => {
  const savedColorScheme = localStorage.getItem(CONSTANTS.THEME_LOCALSTORAGE_KEY);
  if (savedColorScheme) {
    const index = themeOptions.indexOf(savedColorScheme);
    return index < themeOptions.length ? index : "dark";
  } else {
    const systemTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
    return themeOptions.indexOf(systemTheme);
  }
};

const ThemeButton = (props) => {
  const { size, className, children } = props;
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const [activeTheme, setActiveTheme] = useState(getInitialColorScheme());

  useEffect(() => {
    setColorScheme(themeOptions[activeTheme]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeIcon = useMemo(() => {
    let sharedProps = {};
    if (size) {
      sharedProps = { width: size, height: size };
    }
    if (activeTheme === 0) {
      return <Icon icon="line-md:moon-twotone-alt-loop" {...sharedProps} />;
    } else if (activeTheme === 1) {
      return <Icon icon="line-md:sun-rising-twotone-loop" {...sharedProps} />;
    } else {
      return <Icon icon="line-md:light-dark-loop" {...sharedProps} />;
    }
  }, [activeTheme, size]);

  return (
    <button
      className={`${className ?? ""}`}
      onClick={() => {
        const newThemeIndex = (activeTheme + 1) % themeOptions.length;
        setActiveTheme(newThemeIndex);
        setColorScheme(themeOptions[newThemeIndex]);
      }}
    >
      {themeIcon}
      {children}
    </button>
  );
};

export default ThemeButton;
