import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Loader,
  Paper,
  Select,
  Skeleton,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import TitleBox from "../components/global/TitleBox";
import SearchInput from "../components/global/SearchInput";
import { IconRefresh } from "@tabler/icons-react";
import BookingsTable from "../components/BookingsTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBookings } from "../services/bookings";
import { handleErrorResponse } from "../utils/utils";
import LoadingView from "../components/global/LoadingView";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import { useDisclosure } from "@mantine/hooks";
import EditBookingModal from "../components/modals/EditBookingModal";
import AddBooking from "../components/Drawers/AddBooking";
import { deleteAgent, fetchAgents } from "../services/agents";
import AgentsTable from "../components/AgentsTable";
import AddAgent from "../components/Drawers/AddAgent";
import { toast } from "react-toastify";
import { openConfirmModal } from "@mantine/modals";
import EditAgent from "../components/Drawers/EditAgent";

const Agent = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [agentCode, setAgentCode] = useState(null);
  const [name, setName] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [type, setType] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //edit modal
  const [editDrawerOpened, { open: editDrawerOpen, close: editDrawerClose }] =
    useDisclosure(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  //add package drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

  const handleRefresh = () => {
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setAgentCode(null);
    setName(null);
    setContact(null);
    setType(null);
  };

  const handleRefreshLocal = () => {
    setAgentCode(null);
    setName(null);
    handleRefresh();
    setContact(null);
    setType(null);
  };

  const handleSearchId = (value) => {
    setAgentCode(value);
  };

  const handleSearchName = (value) => {
    setName(value);
  };

  const handleSearchContact = (value) => {
    setContact(value);
  };

  const handleSearchEmail = (value) => {
    setEmail(value);
  };

  const handleSelectItem = (agent) => {
    setSelectedAgent(agent);
    editDrawerOpen();
  };

  const handleEditDrawerClose = () => {
    setSelectedAgent(null);
    editDrawerClose();
  };

  const {
    data: agentData,
    isLoading: agentDataLoding,
    error: agentDataError,
    refetch,
    isFetching: agentDataFetching,
  } = useQuery({
    queryKey: ["fetch-agents", agentCode, name, email, contact, type],
    queryFn: fetchAgents,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  const refetchAgents = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-agents"],
      type: "active",
    });
  };

  const {
    mutate: deleteItemMutate,
    isMutating: deleteItemMutating,
    isLoading: deleteItemMutateLoading,
  } = useMutation({
    mutationFn: (value) => deleteAgent(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchAgents();
        toast.error("Deleted Successfully!");
      }
    },
  });

  const handleDeleteItem = (id) => {
    openConfirmModal({
      title: "Confirm",
      styles: () => ({
        title: {
          fontSize: "22px",
          fontWeight: "bold",
        },
      }),
      children: <Text size="sm">Are you sure you want to delete Package?</Text>,
      confirmProps: { color: "red" },
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteItemMutate(id);
      },
    });
  };

  //const { data: agentList } = agentData?.data;

  if (agentDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <div>
      {selectedAgent && (
        <EditAgent
          opened={editDrawerOpened}
          close={handleEditDrawerClose}
          data={selectedAgent}
        />
      )}

      <AddAgent opened={addDrawerOpened} close={addDrawerClose} />

      <Paper>
        <TitleBox title="Agents" />
        <Flex gap={5} py="sm" justify="space-between">
          <Flex gap={5}>
            <SearchInput
              handleRefresh={handleRefresh}
              handleSearch={handleSearchId}
              placeholder="Search Code"
              invokeRefresh={invokingRefreshForSearchInput}
              refreshBtn={false}
            />

            <SearchInput
              handleRefresh={handleRefresh}
              handleSearch={handleSearchName}
              placeholder="Search Name"
              invokeRefresh={invokingRefreshForSearchInput}
              refreshBtn={false}
            />
            <SearchInput
              handleRefresh={handleRefresh}
              handleSearch={handleSearchEmail}
              placeholder="Search Email"
              invokeRefresh={invokingRefreshForSearchInput}
              refreshBtn={false}
            />

            <SearchInput
              handleRefresh={handleRefresh}
              handleSearch={handleSearchContact}
              placeholder="Search Contact"
              invokeRefresh={invokingRefreshForSearchInput}
              refreshBtn={false}
            />

            <Select
              value={type}
              onChange={(e) => setType(e)}
              placeholder="Select Type"
              data={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
            <Flex gap={20} align="flex-start" justify="center">
              <Tooltip label="Refresh">
                <ActionIcon
                  size="lg"
                  onClick={handleRefreshLocal}
                  sx={{
                    backgroundColor: "orange",
                  }}
                  variant="filled"
                >
                  <IconRefresh size={18} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Flex>

          <Flex>
            <Button onClick={addDrawerOpen}>Register Agent</Button>
          </Flex>
        </Flex>

        <div>
          {!agentDataFetching && agentData?.data?.data ? (
            <AgentsTable
              data={agentData?.data?.data}
              handleSelectItem={handleSelectItem}
              handleDeleteItem={handleDeleteItem}
            />
          ) : (
            <LoadingView />
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Agent;
