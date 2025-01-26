import { ActionIcon, Avatar, Badge, Button, Chip, Group, Kbd, Space, Stack, Switch, Text, Title, Tooltip } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";
import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button";
import { Icon } from "@iconify/react";
import { useHotkeys } from "@mantine/hooks";
import IdenticonAvatar from "@components/shared/identicon_avatar/identicon_avatar";

const DashboardOverview = (props) => {
  useHotkeys([["mod+K", () => {console.log("SEARCH");}]]);

  return (
    <div>
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
            <Button ml="auto" variant="subtle" size="xs" radius="xl" leftSection={<Icon icon="line-md:search-twotone" width="1rem" height="1rem" />}>
              <Group gap="2px">
                <Kbd size="xs">Ctrl</Kbd>
                <span style={{ margin: "0 5px" }}>+</span>
                <Kbd size="xs">K</Kbd>
              </Group>
            </Button>
          </Group>

          <ValuePaper.Bare>
            <Group style={{top: "1rem", right: "1rem", position: "absolute"}} gap="xs">
              <Tooltip label="open in OSM" withArrow>
                <ActionIcon variant="transparent" radius="xl" size="md">
                  <Icon icon="tabler:world-share" width="1rem" height="1rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="open website: https://www.viras.de" withArrow>
                <ActionIcon variant="transparent" radius="xl" size="md">
                  <Icon icon="tabler:map-share" width="1rem" height="1rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="pin" withArrow>
                <ActionIcon variant="light" radius="xl" size="md">
                  <Icon icon="tabler:pin" width="1rem" height="1rem" />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Group align="flex-start">
              <Group align="flex-start">
                <IdenticonAvatar id="5bf8373386f11b001aae627e" size="xl" radius="xs">MK</IdenticonAvatar>
                <Stack gap="0.2rem">
                  <Group gap="xs">
                    <Text m={0} fw={600}>Tworkool</Text>
                    <Text c="dimmed" size="xs">5bf8373386f11b001aae627e</Text>
                    {/* <CustomCopyButton value="5bf8373386f11b001aae627e" /> */}
                  </Group>
                  <Group gap="xs">
                    <Badge size="sm" radius="sm" variant="light">active</Badge>
                    <Badge size="sm" radius="sm" variant="light">indoor</Badge>
                    <Badge size="sm" radius="sm" variant="light">7 sensors</Badge>
                    <Badge size="sm" radius="sm" variant="light">2 years ago</Badge>
                  </Group>
                </Stack>
              </Group>

              <Space />

              <Group align="flex-start">
                <iframe flex={1} src="https://maps.google.com/maps?q=52.45608,13.628301&hl=en&z=14&output=embed"></iframe>
                <Text flex={1}>This is a sample description for the following sensebox using text that just comes tom my mind when thinking about this</Text>
              </Group>
            </Group>
          </ValuePaper.Bare>
        </Stack>

        <Stack gap="sm">
          <Group align="baseline">
            <div style={{flex: 1}}>
              <Chip.Group>
                <Group gap="xs">
                  <Chip value="1" variant="filled">Temperatur</Chip>
                  <Chip value="2" variant="filled">Zeit</Chip>
                  <Chip value="3" variant="filled">Druck</Chip>
                  <Chip value="4" variant="filled">Geschwindigkeit</Chip>
                  <Chip value="5" variant="filled">UV-Intensität</Chip>
                </Group>
              </Chip.Group>
            </div>
            <Switch style={{width: "max-content"}} defaultChecked onLabel="ON" offLabel="OFF" label="automatic updates" />
          </Group>
          <ValuePaper.Grid>
            <ValuePaper.Item color="green" value={1000} unit="N" subtitle="Druck" />
            <ValuePaper.Item color="blue" value={12} unit="gal" subtitle="Zeit" />
            <ValuePaper.Item color="red" value={22} unit="mmm" subtitle="Temperatur" />
          </ValuePaper.Grid>
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardOverview;
