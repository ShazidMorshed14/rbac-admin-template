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
import { deleteVehicle, fetchVehicles } from "../services/vehicles";
import { convertToVehicleMenu } from "../common/helper";
import AddPackage from "../components/Drawers/AddPackage";
import { openConfirmModal } from "@mantine/modals";
import { toast } from "react-toastify";
import EditVehicleModal from "../components/modals/EditVehicleModal";
import AddVehicle from "../components/Drawers/AddVehicle";
import VehiclesTable from "../components/VehiclesTable";

const Vehicles = () => {
  const queryClient = useQueryClient();

  //edit modal
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  //add package drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

  const {
    data: vehicleData,
    isLoading: vehicleDataLoading,
    error: vehicleDataError,
    refetch: vehicleDataRefetch,
    isFetching: vehicleDataFetching,
  } = useQuery({
    queryKey: ["fetch-vehicles"],
    queryFn: fetchVehicles,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log("vehicle data must", vehicleData?.data?.data);

  const handleSelectItem = (value) => {
    setSelectedVehicle(value);
    editModalOpen();
  };

  const handleModalClose = () => {
    setSelectedVehicle(null);
    editModalClose();
  };

  const {
    mutate: deleteItemMutate,
    isMutating: deleteItemMutating,
    isLoading: deleteItemMutateLoading,
  } = useMutation({
    mutationFn: (value) => deleteVehicle(value),
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

  const refetchPackages = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicles"],
      type: "active",
    });
  };

  if (vehicleDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <>
      {selectedVehicle && (
        <EditVehicleModal
          opened={editModalOpened}
          close={handleModalClose}
          data={selectedVehicle}
          vehicleData={vehicleData?.data?.data}
        />
      )}

      <AddVehicle
        opened={addDrawerOpened}
        close={addDrawerClose}
        vehicleData={vehicleData?.data?.data}
      />

      <Paper>
        <TitleBox title="Vehicles" />
        <Flex gap={20} py="sm" justify="flex-end">
          <Button onClick={addDrawerOpen} color="orange">
            Add Vehicle
          </Button>
        </Flex>
        <div>
          {!vehicleDataFetching && vehicleData?.data?.data ? (
            <VehiclesTable
              data={vehicleData?.data?.data}
              handleSelectItem={handleSelectItem}
              handleDeleteItem={handleDeleteItem}
            />
          ) : (
            <LoadingView />
          )}
        </div>
      </Paper>
    </>
  );
};

export default Vehicles;
