import {
  ActionIcon,
  Box,
  Button,
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
import { fetchBookings } from "../services/bookings";
import { handleErrorResponse } from "../utils/utils";
import LoadingView from "../components/global/LoadingView";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import { useDisclosure } from "@mantine/hooks";
import EditBookingModal from "../components/modals/EditBookingModal";
import AddBooking from "../components/Drawers/AddBooking";

const Bookings = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [type, setType] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //edit modal
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

  const {
    data: bookingsData,
    isLoading: bookingDataLoding,
    error: bookingDataError,
    refetch,
    isFetching: bookingDataFetching,
  } = useQuery({
    queryKey: ["fetch-bookings", id, name, email, contact, type],
    queryFn: fetchBookings,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  //console.log(bookingsData?.data?.data);

  const handleRefresh = () => {
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setId(null);
    setName(null);
    setContact(null);
    setType(null);
  };

  const handleRefreshLocal = () => {
    setId(null);
    setName(null);
    handleRefresh();
    setContact(null);
    setType(null);
  };

  const handleSearchId = (value) => {
    setId(value);
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

  const handleSearchType = (value) => {
    setType(value);
  };

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    editModalOpen();
  };

  const handleModalClose = () => {
    setSelectedBooking(null);
    editModalClose();
  };

  if (bookingDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <>
      {selectedBooking && (
        <EditBookingModal
          opened={editModalOpened}
          close={handleModalClose}
          data={selectedBooking}
        />
      )}

      <AddBooking opened={addDrawerOpened} close={addDrawerClose} />

      <Paper>
        <TitleBox title="Bookings" />
        <Flex gap={5} py="sm" justify="space-between">
          <Flex gap={5}>
            <SearchInput
              handleRefresh={handleRefresh}
              handleSearch={handleSearchId}
              placeholder="Search Id"
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

          <Flex>
            <Button onClick={addDrawerOpen}>Create Booking</Button>
          </Flex>
        </Flex>
        <div>
          {!bookingDataFetching && bookingsData?.data?.data ? (
            <BookingsTable
              data={bookingsData?.data?.data}
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

export default Bookings;
