import React, { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxesData } from "../../redux/selectors/appState";
import { requestSenseboxesDataFetch } from "../../redux/actions/app_state";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  Group,
  Highlight,
  Indicator,
  Kbd,
  LoadingOverlay,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { Bookmark, Search, Settings as IconSettings, Home as IconHome, InfoCircle as IconInfoCircle, GridDots } from "tabler-icons-react";
import "./style.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import NoDataContainer from "../../containers/no_data";
import IdenticonAvatar from "../identicon_avatar";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { DashboardContext } from "../../pages/dashboard";
import CONSTANTS from "../../utils/constants";

const DashboardHeader = () => {
  const [, setSearch] = useSearchParams();
  const dispatch = useDispatch();
  const dashboardContext = useContext(DashboardContext);
  const senseboxesData = useSelector(getSenseboxesData);
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchHighlightContent, setSearchHighlightContent] = useState("");
  const [bookmarkedBoxes, setBookmarkedBoxes] = useLocalStorage({
    key: "bookmarked-senseboxes",
    defaultValue: [],
  });
  useHotkeys([[`mod+${CONSTANTS.SENSEBOX_SEARCH_HOTKEY}`, () => setOpened(true)]]);
  const [searchError, setSearchError] = useState(null);

  const handleSearchExecution = useCallback(() => {
    if (searchContent === "") {
      setSearchError("cannot be empty");
      return;
    }
    if (searchContent.length < CONSTANTS.MIN_SENSEBOX_SEARCH_CHARACTERS) {
      setSearchError(
        `please type in at least ${CONSTANTS.MIN_SENSEBOX_SEARCH_CHARACTERS} characters`
      );
      return;
    }
    dispatch(requestSenseboxesDataFetch({ name: searchContent }));
    setIsLoading(true);
    setSearchHighlightContent(searchContent);
    setSearchError(null);
  }, [dispatch, searchContent]);

  useEffect(() => {
    if (!senseboxesData.data) return;
    setIsLoading(false);
  }, [senseboxesData]);

  const handleSenseboxSelect = useCallback(
    (id) => {
      setSearch({ [CONSTANTS.ROUTING.SENSEBOX_ID]: id });
      setOpened(false);
    },
    [setSearch]
  );

  const sortedBookmarkedBoxes = useCallback((activeId) => {
    const _arr = [...bookmarkedBoxes];
    const index = _arr.findIndex(e => e._id === activeId);
    if (index == -1) return bookmarkedBoxes;
    const element = _arr[index];
    _arr.splice(index, 1);
    _arr.push(element);
    return _arr;
  }, [bookmarkedBoxes]);

  return (
    <div className="sbd-dashboard-header">
      <div className="sbd-dashboard-header__content">
        <Group gap="xl">
          <Indicator size={16} position="middle-end" color="green" withBorder>
            <IdenticonAvatar id={dashboardContext.selectedSenseboxId} />
          </Indicator>
          {!(bookmarkedBoxes.length === 0 || (bookmarkedBoxes.length === 1 && bookmarkedBoxes[0]._id === dashboardContext.selectedSenseboxId)) && 
          <div className="sbd-dashboard-header__bookmarks">
            <div className="sbd-dashboard-header__bookmarks__header">
              <Bookmark size={22}/>
            </div>
            <div className="sbd-dashboard-header__bookmarks__content">
              {bookmarkedBoxes.map((e,i) => {
                const boxSelected = e._id === dashboardContext.selectedSenseboxId;
                return <Tooltip
                  key={i}
                  label={e.name}
                  color="dark"
                  position="bottom"
                  withArrow
                >
                  <UnstyledButton
                    onClick={(_) => {
                      if (boxSelected) return;
                      handleSenseboxSelect(e._id);
                    }}
                  >
                    <IdenticonAvatar 
                      size="md" 
                      className={`sbd-dashboard-header__bookmarks__item ${boxSelected ? "sbd-dashboard-header__bookmarks__item--active" : ""}`} 
                      id={e._id} 
                    />
                  </UnstyledButton>
                </Tooltip>;
              })}
            </div>
          </div>
          }
        </Group>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="light" color="gray" rightSection={<GridDots size={18} />}>
                <span>Menu</span>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>General</Menu.Label>
              <Menu.Item 
                icon={<IconHome size={18} strokeWidth={1.5}/>} 
                component="a"
                href="/">
                  Home
              </Menu.Item>
              <Menu.Item 
                icon={<IconInfoCircle size={18} strokeWidth={1.5}/>}
                component="a"
                href="/info">
                Info/Help
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Dashboard</Menu.Label>
              <Menu.Item disabled icon={<IconSettings size={18} strokeWidth={1.5}/>}>Settings</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button
            className="sbd-hide--phone"
            variant="light"
            color="gray"
            onClick={() => setOpened(true)}
            leftSection={<Search size={16} />}
            rightSection={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <Kbd>Ctrl</Kbd>
                <span style={{ margin: "0 5px" }}>+</span>
                <Kbd>{CONSTANTS.SENSEBOX_SEARCH_HOTKEY}</Kbd>
              </div>
            }
          >
          Find a SenseBox
          </Button>
          <Button
            leftSection={<Search size={18} />}
            variant="light"
            color="gray"
            onClick={() => setOpened(true)}
            className="sbd-hide--tablet-and-desktop"
          >
          Find Sensebox
          </Button>
        </Group>
        <Modal
          size={"lg"}
          opened={opened}
          onClose={() => setOpened(false)}
          title="Find a Sensebox"
        >
          <form className="sbd-search-grid" onSubmit={e => {
            e?.preventDefault();
            handleSearchExecution();
          }}>
            <TextInput
              size="md"
              defaultValue={searchContent}
              placeholder="Search by name"
              icon={<Search size={16} />}
              onChange={(e) => {
                setSearchContent(e.target.value);
              }}
              error={searchError}
            />
            <Button
              size="md"
              autoFocus
              type="submit"
            >
                Search
            </Button>
          </form>

          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <Search size={12} />
                <Box ml={5}>Search results</Box>
              </>
            }
          />
          <div>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {senseboxesData?.data === undefined ||
            senseboxesData?.data?.length === 0 ? (
                <Center style={{ height: 200 }}>
                  <NoDataContainer>
                  Search for a Sensebox by its name in the field above
                  </NoDataContainer>
                </Center>
              ) : (
                senseboxesData.data.map((e, i) => (
                  <UnstyledButton
                    onClick={() => {
                      handleSenseboxSelect(e._id);
                    }}
                    key={i}
                    className="sbd-dashboard-header-search-result"
                  >
                    <Group>
                      <IdenticonAvatar id={e._id} />
                      <Stack
                        spacing="xs"
                        className="sbd-dashboard-header-search-result__info"
                      >
                        <Highlight
                          highlightColor="blue"
                          highlight={searchHighlightContent}
                          weight={600}
                        >
                          {e.name}
                        </Highlight>
                        <Text size="xs" c="dimmed">
                          {e._id}
                        </Text>
                      </Stack>
                    </Group>
                  </UnstyledButton>
                ))
              )}
          </div>
          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <Bookmark size={12} />
                <Box ml={5}>Bookmarked Senseboxes</Box>
              </>
            }
          />
          <Group justify="center">
            {bookmarkedBoxes.length === 0 && (
              <Group justify="center" grow>
                <Text size="sm" c="dimmed">
                  No Bookmarked Boxes yet!
                </Text>
              </Group>
            )}
            {bookmarkedBoxes.map((e, i) => {
              return (
                <Tooltip
                  key={i}
                  label={e.name}
                  color="dark"
                  position="bottom"
                  withArrow
                >
                  <UnstyledButton
                    onClick={(_) => {
                      handleSenseboxSelect(e._id);
                    }}
                  >
                    {e._id === dashboardContext.selectedSenseboxId ? (
                      <Indicator
                        size={16}
                        position="middle-end"
                        color="green"
                        withBorder
                      >
                        <IdenticonAvatar id={e._id} />
                      </Indicator>
                    ) : (
                      <IdenticonAvatar id={e._id} />
                    )}
                  </UnstyledButton>
                </Tooltip>
              );
            })}
            {bookmarkedBoxes.length !== 0 && <CloseButton onClick={() => {setBookmarkedBoxes([]);}} title="Clear Bookmarks" size="md" iconSize={14} />}
          </Group>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardHeader;
