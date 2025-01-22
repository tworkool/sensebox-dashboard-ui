import { Button, ColorInput, Grid, Group, NumberInput, Select, Space, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useLayoutEffect } from "react";
import { CONSTANTS } from "@utils/environment";
import { notifications } from "@mantine/notifications";

const sharedStyle = {
  variant: "filled",
};

// Default settings for the dashboard
// all settings MUST be present in this object and have a default value
const defaultSettings = {
  automaticUpdateInterval: 60,
  boxInactiveAfter: 24,
  sensorInactiveAfter: 12,
  fallbackNullValue: "<EMPTY>",
  primaryDashboardColor: "#9038e8",
  dateFormat: "MMM Do YY",
};

const dateFormats = ["MMM Do YY", "DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"];

const DashboardSettings = (props) => {
  const form = useForm({
    initialValues: {...defaultSettings},
  });

  const handleSubmit = (values) => {
    localStorage.setItem(CONSTANTS.SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(values));
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target.result);
          form.setValues(settings);
        } catch (error) {
          notifications.show({
            title: 'Error Importing Settings',
            message: 'Could not import settings from file',
            color: 'red',
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExport = () => {
    // save first
    handleSubmit(form.values);
    console.log(form.values);
    // then export
    const filename = "senseBox_dashboard_settings.json";
    const jsonStr = JSON.stringify(form.values);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleRestore = () => {
    form.setValues(defaultSettings);
    localStorage.setItem(CONSTANTS.SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(defaultSettings));
  };

  // load settings from local storage
  useLayoutEffect(() => {
    const settings = localStorage.getItem(CONSTANTS.SETTINGS_LOCALSTORAGE_KEY);
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings);
        form.setValues(parsedSettings);
      } catch (error) {
        notifications.show({
          title: 'Error Loading Settings',
          message: 'Could not load settings from local storage. Using default settings.',
          color: 'red',
        });
        localStorage.setItem(CONSTANTS.SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(defaultSettings));
      }
    } else {
      notifications.show({
        title: 'Settings Not Loaded',
        message: 'Could not load settings from local storage. Using default settings.',
        color: 'red',
      });
      localStorage.setItem(CONSTANTS.SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(defaultSettings));
    }
  }, []);

  return (
    <>
      {/* Colors for Sensor Type, Colors of UI
      Value Unit Conversion
      Register Extensions via Rapid API etc. */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <h1>General</h1>
        <Grid>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Automatic Update Interval"
              description="Interval between automatic updates on live data page (in seconds)"
              placeholder={defaultSettings.automaticUpdateInterval}
              key={form.key('automaticUpdateInterval')}
              {...form.getInputProps('automaticUpdateInterval')}
              min={60}
              max={60*60*24}
              suffix="s"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Box Inactive After..."
              description="How long after the senseBox is marked as inactive (in hours)"
              placeholder={defaultSettings.boxInactiveAfter}
              key={form.key('boxInactiveAfter')}
              {...form.getInputProps('boxInactiveAfter')}
              min={1}
              max={24*7}
              suffix="h"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Sensor Inactive After..."
              description="How long after a sensor is marked as inactive (in hours)"
              placeholder={defaultSettings.sensorInactiveAfter}
              key={form.key('sensorInactiveAfter')}
              {...form.getInputProps('sensorInactiveAfter')}
              min={1}
              max={24*7}
              suffix="h"
            />
          </Grid.Col>
          <Grid.Col span={"content"}>
            <TextInput
              {...sharedStyle}
              label="Fallback Null Value"
              description="Value to display when a sensor value is not available"
              placeholder={defaultSettings.fallbackNullValue}
              key={form.key('fallbackNullValue')}
              {...form.getInputProps('fallbackNullValue')}
            />
          </Grid.Col>
        </Grid>

        <h1>Internationalization</h1>
        <Grid>
          <Grid.Col span={"content"}>
            <Select
              {...sharedStyle}
              label="Date Format"
              placeholder={defaultSettings.dateFormat}
              key={form.key('dateFormat')}
              {...form.getInputProps('dateFormat')}
              data={dateFormats}
            />
          </Grid.Col>
        </Grid>

        <h1>Style & Theme</h1>
        <Grid>
          <Grid.Col span={"content"}>
            <ColorInput
              {...sharedStyle}
              label="Primary Dashboard Color"
              placeholder={defaultSettings.primaryDashboardColor}
              key={form.key('primaryDashboardColor')}
              {...form.getInputProps('primaryDashboardColor')}
              swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              format="hex"
              closeOnColorSwatchClick
            />
          </Grid.Col>
        </Grid>

        <Space h="xl" />

        <Group gap="xs">
          <Button variant="light" onClick={handleRestore}>Restore Defaults</Button>
          <Button variant="light" onClick={handleExport}>Export</Button>
          <Button variant="light" onClick={handleImport}>Import</Button>
          <Button ml="auto" type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
};

export default DashboardSettings;
