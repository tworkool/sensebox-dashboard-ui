import { Chip, Group, Stack } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";

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

        <ValuePaper.Bare subtitle="5bf8373386f11b001aae627e" withCopyButton>
          This is box etc.
        </ValuePaper.Bare>

        <ValuePaper.Grid>
          <ValuePaper.Item color="green" value="1,000" unit="kg" subtitle="Temperatur" />
          <ValuePaper.Item color="blue" value="1,22" unit="g" subtitle="Druck" />
          <ValuePaper.Item color="red" value="1,000" unit="kg" subtitle="Temperatur" />
        </ValuePaper.Grid>
      </Stack>
    </div>
  );
};

export default DashboardOverview;
