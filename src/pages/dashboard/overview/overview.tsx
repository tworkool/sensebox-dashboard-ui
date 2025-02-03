import { ActionIcon, Badge, Button, Center, Chip, Container, Grid, Group, Popover, Skeleton, Space, Stack, Switch, Text, Title, Tooltip } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";
/* import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button"; */
import { Icon } from "@iconify/react";
import IdenticonAvatar from "@components/shared/identicon_avatar/identicon_avatar";
import { useQuery } from "@tanstack/react-query";
import { OSEMBoxesService } from "@api/services/boxes";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSettingsStore } from "@stores";
import DashboardBoxSearch from "@components/static/dashboard_box_search/dashboard_box_search";

const sensorFilterProperty = "title";

const DashboardOverview = () => {
  const settingsStore = useSettingsStore();
  const [selectedSenseBoxId, setSelectedSenseBoxId] = useState("5bf8373386f11b001aae627e");
  const [filter, setFilter] = useState<string>("None");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["OSEM_GET_ONE_BOX", { senseBoxId: selectedSenseBoxId }],
    queryFn: async (params) => OSEMBoxesService.getOneSenseBox(params),
    "refetchOnReconnect": false, // disable for now!
    "refetchOnMount": false,
    "refetchOnWindowFocus": false,
  });

  useEffect(() => {
    // remove filter when changing sensebox
    setFilter("None");
  }, [selectedSenseBoxId]);

  console.log(filter);

  const sensorFilterGroups = useMemo(() => {
    if (!data) return [];
    const units = data.sensors.map((sensor) => sensor[sensorFilterProperty]);
    return [...new Set(units)];
  }, [data]);

  return (
    <>
      <Stack gap="xl">
        <Group>
          <Chip.Group>
            <Group gap="xs">
              <Chip value="1" variant="filled">closest to you</Chip>
              <Chip value="2" variant="filled">pinned</Chip>
              <Chip value="3" variant="filled">search</Chip>
            </Group>
          </Chip.Group>
          <DashboardBoxSearch onSelect={(boxId) => { setSelectedSenseBoxId(boxId); }} />
        </Group>

        {(data || isPending) ?
          <>

            <Grid>
              <Grid.Col span={6}>
                <Skeleton visible={isPending}>
                  <ValuePaper.Bare>
                    {data &&
                      <Group style={{ top: "1rem", right: "1rem", position: "absolute", zIndex: 3 }} gap="xs">
                        <Tooltip label="open in OSM" withArrow>
                          <ActionIcon component="a" href={`https://opensensemap.org/explore/${data._id}`} target="_blank" variant="transparent" radius="xl" size="md">
                            <Icon icon="tabler:world-share" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>
                        {data?.weblink && <Tooltip label={`open website: ${data.weblink}`} withArrow>
                          <ActionIcon component="a" href={data.weblink} target="_blank" variant="transparent" radius="xl" size="md">
                            <Icon icon="tabler:map-share" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>}
                        <Tooltip label="pin" withArrow>
                          <ActionIcon variant="light" radius="xl" size="md">
                            <Icon icon="tabler:pin" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>
                      </Group>}

                    <Group align="flex-start">
                      {data?._id && <IdenticonAvatar id={data._id} size="xl" radius="xs">MK</IdenticonAvatar>}
                      <Stack gap="0.2rem">
                        <Group gap="0.2rem">
                          <Title order={2}>{data?.name}</Title>
                          <Text ff="monospace" c="dimmed" size="xs">{data?._id ? data._id : "Sample Sensebox"}</Text>
                          {/* <CustomCopyButton value="5bf8373386f11b001aae627e" /> */}
                        </Group>
                        <Space h="sm" />
                        <Group gap="0.3rem">
                          {data && <Badge size="sm" radius="sm" variant="light">{data?.active ? "active" : "inactive" + ` (${dayjs(data?.updatedAt).fromNow()})`}</Badge>}
                          <Badge size="sm" radius="sm" variant="light">{data?.exposure}</Badge>
                          <Badge size="sm" radius="sm" variant="light">{`${data?.sensors?.length} Sensors`}</Badge>
                          {data?.createdAt && <Badge size="sm" radius="sm" variant="light">{dayjs(data.createdAt).fromNow()}</Badge>}
                        </Group>
                        {data?.description && <Text>{data.description}</Text>}
                      </Stack>
                    </Group>
                  </ValuePaper.Bare>
                </Skeleton>
              </Grid.Col>
              <Grid.Col span={6}>
                <Skeleton visible={isPending}>
                  <ValuePaper.Bare>
                    <Stack>
                      {data && <iframe
                        style={{ height: 300 }}
                        src={`https://maps.google.com/maps?q=${data?.currentLocation?.coordinates?.[1]},${data?.currentLocation?.coordinates?.[0]}&hl=en&z=14&output=embed`}>
                      </iframe>}
                      <Text>Berlin, Germany</Text>
                    </Stack>
                  </ValuePaper.Bare>
                </Skeleton>
              </Grid.Col>
            </Grid>

            <Stack gap="sm">
              <Group justify="flex-end">
                {/* <div style={{ flex: 1 }}>
                  <Chip.Group>
                    <Group gap="xs">
                      {unitLabelGroups && unitLabelGroups.map((label, index) => <Chip key={index} value={index} variant="filled">{label}</Chip>)}
                    </Group>
                  </Chip.Group>
                </div>
                <Switch style={{ width: "max-content" }} defaultChecked onLabel="ON" offLabel="OFF" label="automatic updates" /> */}
                <Popover width={200} position="bottom-end" withArrow shadow="md">
                  <Popover.Target>
                    <Button
                      disabled={isPending}
                      size="compact-sm"
                      variant="light"
                      color="gray"
                      radius="xl"
                      rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                    >
                      filters
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Chip.Group multiple={false} value={filter} onChange={(value) => { setFilter(value as string); }}>
                      <Group gap="xs">
                        <Chip value="None" variant="outline">None</Chip>
                        {sensorFilterGroups && sensorFilterGroups.map((filterProperty, index) => <Chip key={index} value={filterProperty} variant="light">{filterProperty}</Chip>)}
                      </Group>
                    </Chip.Group>
                  </Popover.Dropdown>
                </Popover>
              </Group>
              <ValuePaper.Grid>
                {data && data?.sensors.filter(sensor => !filter || filter === "None" || sensor[sensorFilterProperty] == filter).map((sensor, index) => {
                  return <ValuePaper.Item key={index} value={sensor.lastMeasurement?.value} unit={sensor.unit} subtitle={sensor.title} />;
                })}
                {(!data && isPending) && [...new Array(7)].map((_, index) => <Skeleton key={index} visible><ValuePaper.Item value={0} unit="N/A" subtitle="N/A" /></Skeleton>)}
              </ValuePaper.Grid>
            </Stack>
          </> : <>
            <Center>
              <Stack align="center" gap="sm" mt="md">
                <Icon icon="tabler:cloud-data-connection" width="100" height="100" />
                <Group gap="xs" align="baseline">
                  <Text ta="center">Could not fetch data!</Text>
                  <Button size="compact-sm" variant="transparent" onClick={() => { refetch(); }}>Retry</Button>
                </Group>
              </Stack>
            </Center>
          </>
        }
      </Stack>
    </>
  );
};

export default DashboardOverview;
