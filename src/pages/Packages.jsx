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
import { fetchBookings, fetchCallBookings } from "../services/bookings";
import { handleErrorResponse } from "../utils/utils";
import LoadingView from "../components/global/LoadingView";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import CallBookingTable from "../components/CallBookingTable";
import EditCallBookingModal from "../components/modals/EditCallBookingModal";
import { useDisclosure } from "@mantine/hooks";
import { deletePackage, fetchPackages } from "../services/packages";
import PackagesTable from "../components/PackagesTable";
import EditPackageModal from "../components/modals/EditPackageModal";
import { fetchVehicles } from "../services/vehicles";
import { convertToVehicleMenu } from "../common/helper";
import AddPackage from "../components/Drawers/AddPackage";
import { openConfirmModal } from "@mantine/modals";
import { toast } from "react-toastify";

const Packages = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //edit modal
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  //add package drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

  const {
    data: packagesData,
    isLoading: packagesDataLoding,
    error: packagesDataError,
    refetch,
    isFetching: packagesDataFetching,
  } = useQuery({
    queryKey: ["fetch-packages", id, name, type, vehicleId],
    queryFn: fetchPackages,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log(packagesData?.data?.data);

  const {
    data: vehicleData,
    isLoading: vehicleDataLoading,
    error: vehicleDataError,
    refetch: vehicleDataRefetch,
    isFetching: vehicleDataFetching,
  } = useQuery({
    queryKey: ["fetch-vehicles", id, name, type, vehicleId],
    queryFn: fetchVehicles,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log("vehicle data must", vehicleData?.data?.data);

  const handleRefresh = () => {
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setId(null);
    setName(null);
    setType(null);
    setVehicleId(null);
  };

  const handleRefreshLocal = () => {
    handleRefresh();
    setId(null);
    setName(null);
    setType(null);
    setVehicleId(null);
  };

  const handleSearchId = (value) => {
    setId(value);
  };

  const handleSearchName = (value) => {
    setName(value);
  };

  const handleSelectPackage = (value) => {
    setSelectedPackage(value);
    editModalOpen();
  };

  const handleModalClose = () => {
    setSelectedPackage(null);
    editModalClose();
  };

  const {
    mutate: deletePackageMutate,
    isMutating: deletePackageMutating,
    isLoading: deletePackageMutateLoading,
  } = useMutation({
    mutationFn: (value) => deletePackage(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchPackages();
        toast.error("Deleted Successfully!");
      }
    },
  });

  const handlePackageDelete = (id) => {
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
        deletePackageMutate(id);
      },
    });
  };

  const refetchPackages = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-packages"],
      type: "active",
    });
  };

  if (packagesDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <>
      {selectedPackage && (
        <EditPackageModal
          opened={editModalOpened}
          close={handleModalClose}
          data={selectedPackage}
          vehicleData={vehicleData?.data?.data}
        />
      )}

      <AddPackage
        opened={addDrawerOpened}
        close={addDrawerClose}
        vehicleData={vehicleData?.data?.data}
      />

      <Paper>
        <TitleBox title="Packages" />
        <Flex gap={20} py="sm" justify="space-between">
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
              placeholder="Name"
              invokeRefresh={invokingRefreshForSearchInput}
              refreshBtn={false}
            />

            <Select
              value={type}
              onChange={(e) => setType(e)}
              placeholder="Select Type"
              data={[
                { value: true, label: "Active" },
                { value: false, label: "Inactive" },
              ]}
            />

            <Select
              value={vehicleId}
              onChange={(e) => setVehicleId(e)}
              placeholder="Select Vehicle Type"
              data={
                vehicleData?.data?.data
                  ? convertToVehicleMenu(vehicleData?.data?.data)
                  : []
              }
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
            <Button onClick={addDrawerOpen} color="orange">
              Add Package
            </Button>
          </Flex>
        </Flex>
        <div>
          {!packagesDataFetching && packagesData?.data?.data ? (
            <PackagesTable
              data={packagesData?.data?.data}
              handleSelectPackage={handleSelectPackage}
              handlePackageDelete={handlePackageDelete}
            />
          ) : (
            <LoadingView />
          )}
        </div>
      </Paper>
    </>
  );
};

export default Packages;
