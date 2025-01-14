import { Chip, Group } from "@mantine/core";

const DashboardOverview = (props) => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <Chip.Group>
        <Group gap="xs">
          <Chip value="1" defaultChecked variant="light" icon={<></>}>closest to you</Chip>
          <Chip value="2" variant="light" icon={null}>my box</Chip>
          <Chip value="3" variant="light" icon={null}>search</Chip>
        </Group>
      </Chip.Group>
    </div>
  );
};

export default DashboardOverview;
