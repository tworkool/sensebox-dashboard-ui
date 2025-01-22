import { ActionIcon, Avatar, Badge, Chip, Group, Space, Stack, Text, Title, Tooltip } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";
import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button";
import { Icon } from "@iconify/react";

const DashboardOverview = (props) => {
  return (
    <div>
      <Stack>
        <Chip.Group>
          <Group gap="xs">
            <Chip value="1" variant="light">closest to you</Chip>
            <Chip value="2" variant="light">pinned</Chip>
            <Chip value="3" variant="light">search</Chip>
          </Group>
        </Chip.Group>

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
              <Avatar size="xl" radius="xs">MK</Avatar>
              <Stack gap="0.2rem">
                <Group gap="xs">
                  <Text c="dimmed" size="xs">5bf8373386f11b001aae627e</Text>
                  {/* <CustomCopyButton value="5bf8373386f11b001aae627e" /> */}
                </Group>
                <Title order={2} m={0}>Tworkool</Title>
                <Group gap="xs">
                  <Badge size="sm" radius="sm" variant="light">active</Badge>
                  <Badge size="sm" radius="sm" variant="light">indoor</Badge>
                  <Badge size="sm" radius="sm" variant="light">7 sensors</Badge>
                  <Badge size="sm" radius="sm" variant="light">2 years ago</Badge>
                </Group>
              </Stack>
            </Group>

            <Space />

            <Text>This is a sample description for the following sensebox using text that just comes tom my mind when thinking about this</Text>

            <iframe src="https://maps.google.com/maps?q=52.45608,13.628301&hl=en&z=14&output=embed" style={{border: "none", width: "100%"}}></iframe>
          </Group>
        </ValuePaper.Bare>

        <ValuePaper.Grid>
          <ValuePaper.Item color="green" value={1000} unit="N" subtitle="Druck" />
          <ValuePaper.Item color="blue" value={12} unit="gal" subtitle="Zeit" />
          <ValuePaper.Item color="red" value={22} unit="mmm" subtitle="Temperatur" />
        </ValuePaper.Grid>
      </Stack>
    </div>
  );
};

export default DashboardOverview;
