import { ActionIcon, Button, Container, Group, Kbd, LoadingOverlay, Modal, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { useDisclosure, useHotkeys, useDebouncedCallback } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import { useState, memo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { OSEMBoxesService } from "@api/services/boxes";
import IdenticonAvatar from "@components/shared/identicon_avatar/identicon_avatar";
import "./dashboard_box_search.scss";

export interface DashboardBoxSearchProps {
  onSelect: (senseBoxId: string) => void;
}

const DashboardBoxSearch = (props: DashboardBoxSearchProps) => {
  const [value, setvalue] = useState<string>();
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>();
  const { onSelect } = props;
  const [opened, { open, close }] = useDisclosure(false);
  useHotkeys([["mod+K", open]]);

  const { data, isFetching } = useQuery({
    queryKey: ["OSEM_SEARCH_BOXES", { minimal: true, name: currentSearchQuery }],
    queryFn: async (queryData) => {
      const [_, body] = queryData.queryKey;
      console.log(body);
      if (!body?.name) return null;
      return OSEMBoxesService.getAllSenseBoxes(queryData);
    },
    "refetchOnMount": false,
    "refetchOnReconnect": false,
    "refetchOnWindowFocus": false,
  });

  const handleSearch = useDebouncedCallback(async (query: string) => {
    // this will automatically update the search query
    setCurrentSearchQuery(query);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (!newValue) return;
    setvalue(newValue);
    handleSearch(newValue);
  };

  return (
    <>
      <Modal p="sm" opened={opened} onClose={close} withCloseButton={false} radius="md" shadow="xl">
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <Stack>
            <TextInput
              defaultValue={value}
              onChange={handleChange}
              variant="filled"
              placeholder="My SenseBox 123"
              name="search-sensebox">
            </TextInput>
            {/* <Button type="submit">Select</Button> */}
            <Container fluid mih={200} m="0" p="0">
              <Stack gap="xs">
                {data && data.map((box, index) =>
                  <UnstyledButton className="dashboard-box-search__search-item" variant="subtle" size="md" key={index} onClick={() => { onSelect?.(box._id); close(); }}>
                    <Group>
                      <IdenticonAvatar id={box._id} radius="sm" />
                      <div>
                        <Text c={"text"} fw="bold">{box.name}</Text>
                        <Text c="dimmed" ff="monospace" size="xs">{box._id}</Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                )}
              </Stack>
              {!data && <Text c="dimmed" ta="center">no results</Text>}
              <LoadingOverlay visible={isFetching} />
            </Container>
          </Stack>
        </form>
      </Modal>
      <Button
        className="dashboard-box-search__target"
        onClick={open} ml="auto" variant="default" size="xs" radius="xl"
        /* leftSection={<Icon icon="line-md:search-twotone" width="1rem" height="1rem" />} */
        rightSection={
          <Group gap="2px" className="dashboard-box-search__target__kbg">
            <Kbd size="xs">Ctrl</Kbd>
            <Kbd size="xs">K</Kbd>
          </Group>
        }
      >
        <Icon icon="line-md:search-twotone" width="1rem" height="1rem" />
        {/* <Group gap="2px" className="dashboard-box-search__target__kbg">
          <Kbd size="xs">Ctrl</Kbd>
          <Kbd size="xs">K</Kbd>
        </Group> */}
      </Button>
    </>
  );
};

export default memo(DashboardBoxSearch);
