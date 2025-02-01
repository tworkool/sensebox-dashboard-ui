import { ActionIcon, Badge, Button, Chip, Grid, Group, Kbd, Modal, Skeleton, Stack, Switch, Text, TextInput, Title, Tooltip } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";
/* import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button"; */
import { Icon } from "@iconify/react";
import { useHotkeys, useDisclosure } from "@mantine/hooks";
import IdenticonAvatar from "@components/shared/identicon_avatar/identicon_avatar";
import { useQuery } from "@tanstack/react-query";
import { OSEMBoxesService } from "@api/services/boxes";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSettingsStore } from "@stores";

const DashboardOverview = () => {
  const settingsStore = useSettingsStore();
  const [selectedSenseBoxId, setSelectedSenseBoxId] = useState("5bf8373386f11b001aae627e");
  const [opened, { open, close }] = useDisclosure(false);
  useHotkeys([["mod+K", open]]);

  const { data, isPending } = useQuery({
    queryKey: ["OSEM_GET_ONE_BOX", selectedSenseBoxId],
    queryFn: async (params) => OSEMBoxesService.getOneSenseBox(params),
  });

  const unitLabelGroups = useMemo(() => {
    if (!data) return [];
    const units = data.sensors.map((sensor) => sensor.title);
    return [...new Set(units)];
  }, [data]);

  return (
    <div>
      <Modal p="sm" opened={opened} onClose={close} withCloseButton={false}>
        <form onSubmit={(e) => { e.preventDefault(); close(); setSelectedSenseBoxId(e.target["search-sensebox"].value); }}>
          <Stack>
            <TextInput variant="filled" placeholder="My SenseBox 123" name="search-sensebox"></TextInput>
            <Button type="submit">Select</Button>
          </Stack>
        </form>
      </Modal>
      <Stack gap="xl">
        <Stack gap="sm">
          <Group>
            <Chip.Group>
              <Group gap="xs">
                <Chip value="1" variant="filled">closest to you</Chip>
                <Chip value="2" variant="filled">pinned</Chip>
                <Chip value="3" variant="filled">search</Chip>
              </Group>
            </Chip.Group>
            <Button onClick={open} ml="auto" variant="subtle" size="xs" radius="xl" leftSection={<Icon icon="line-md:search-twotone" width="1rem" height="1rem" />}>
              <Group gap="2px">
                <Kbd size="xs">Ctrl</Kbd>
                <Kbd size="xs">K</Kbd>
              </Group>
            </Button>
          </Group>

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
                      <Group gap="xs">
                        <Title order={2}>{data?.name}</Title>
                        <Text c="dimmed" size="xs">{data?._id ? data._id : "Sample Sensebox"}</Text>
                        {/* <CustomCopyButton value="5bf8373386f11b001aae627e" /> */}
                      </Group>
                      <Group gap="xs">
                        <Badge size="sm" radius="sm" variant="light">{data?.active ? "active" : "inactive"}</Badge>
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
        </Stack>

        <Stack gap="sm">
          <Group align="baseline">
            <div style={{ flex: 1 }}>
              <Chip.Group>
                <Group gap="xs">
                  {unitLabelGroups && unitLabelGroups.map((label, index) => <Chip key={index} value={index} variant="filled">{label}</Chip>)}
                  {/* <Chip value="1" variant="filled">Temperatur</Chip>
                  <Chip value="2" variant="filled">Zeit</Chip>
                  <Chip value="3" variant="filled">Druck</Chip>
                  <Chip value="4" variant="filled">Geschwindigkeit</Chip>
                  <Chip value="5" variant="filled">UV-Intensität</Chip> */}
                </Group>
              </Chip.Group>
            </div>
            <Switch style={{ width: "max-content" }} defaultChecked onLabel="ON" offLabel="OFF" label="automatic updates" />
          </Group>
          <ValuePaper.Grid>
            {data && data?.sensors.map((sensor, index) => {
              return <ValuePaper.Item key={index} value={sensor.lastMeasurement.value} unit={sensor.unit} subtitle={sensor.title} />;
            })}
            {(!data && isPending) && [...new Array(7)].map((_, index) => <Skeleton key={index} visible><ValuePaper.Item value={0} unit="N/A" subtitle="N/A" /></Skeleton>)}
            {/* <ValuePaper.Item color="green" value={1000} unit="N" subtitle="Druck" />
            <ValuePaper.Item color="blue" value={12} unit="gal" subtitle="Zeit" />
            <ValuePaper.Item color="red" value={22} unit="mmm" subtitle="Temperatur" /> */}
          </ValuePaper.Grid>
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardOverview;
