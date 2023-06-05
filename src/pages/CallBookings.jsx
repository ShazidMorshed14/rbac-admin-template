import {
  ActionIcon,
  Box,
  Flex,
  Loader,
  Paper,
  Select,
  Skeleton,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import TitleBox from "../components/global/TitleBox";
import SearchInput from "../components/global/SearchInput";
import { IconRefresh } from "@tabler/icons-react";
import BookingsTable from "../components/BookingsTable";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings, fetchCallBookings } from "../services/bookings";
import { handleErrorResponse } from "../utils/utils";
import LoadingView from "../components/global/LoadingView";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import CallBookingTable from "../components/CallBookingTable";
import EditCallBookingModal from "../components/modals/EditCallBookingModal";
import { useDisclosure } from "@mantine/hooks";

const CallBookings = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [contact, setContact] = useState(null);
  const [type, setType] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //edit modal
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false);
  const [selectedCallBooking, setSelectedCallBooking] = useState(null);

  const {
    data: callBookingData,
    isLoading: callBookingDataLoding,
    error: callBookingDataError,
    refetch,
    isFetching: callBookingDataFetching,
  } = useQuery({
    queryKey: ["fetch-call-bookings", id, contact, type],
    queryFn: fetchCallBookings,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  //console.log(callBookingData?.data?.data);

  const handleRefresh = () => {
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setId(null);
    setContact(null);
    setType(null);
  };

  const handleRefreshLocal = () => {
    setId(null);
    handleRefresh();
    setContact(null);
    setType(null);
  };

  const handleSearchId = (value) => {
    setId(value);
  };

  const handleSearchContact = (value) => {
    setContact(value);
  };

  const handleSearchType = (value) => {
    setType(value);
  };

  const handleSelectBooking = (booking) => {
    setSelectedCallBooking(booking);
    editModalOpen();
  };

  const handleModalClose = () => {
    setSelectedCallBooking(null);
    editModalClose();
  };

  if (callBookingDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <>
      {selectedCallBooking && (
        <EditCallBookingModal
          opened={editModalOpened}
          close={handleModalClose}
          data={selectedCallBooking}
        />
      )}
      <Paper>
        <TitleBox title="Call Bookings" />
        <Flex gap={20} py="sm">
          <SearchInput
            handleRefresh={handleRefresh}
            handleSearch={handleSearchId}
            placeholder="Search Id"
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
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "cancelled", label: "Cancelled" },
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
        <div>
          {!callBookingDataFetching && callBookingData?.data?.data ? (
            <CallBookingTable
              data={callBookingData?.data?.data}
              handleSelectBooking={handleSelectBooking}
            />
          ) : (
            <LoadingView />
          )}
        </div>
      </Paper>
    </>
  );
};

export default CallBookings;
