import { Button, Flex, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AddVehicleModel from "../components/Drawers/AddVehicleModel";
import VehicleModelsTable from "../components/VehicleModelsTable";
import LoadingView from "../components/global/LoadingView";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import TitleBox from "../components/global/TitleBox";
import EditVehicleModelModal from "../components/modals/EditVehicleModelModal";
import {
  deleteVehicleModel,
  fetchVehicleModel,
} from "../services/vehicleModel";
import { fetchVehicles } from "../services/vehicles";
import { handleErrorResponse } from "../utils/utils";

const VehicleModels = () => {
  const queryClient = useQueryClient();

  //edit modal
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState(null);

  //add package drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

  const refetchVehicleModels = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicle-models"],
      type: "active",
    });
  };

  const {
    data: vehicleData,
    isLoading: vehicleDataLoading,
    error: vehicleDataError,
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

  const {
    data: vehicleModelData,
    isLoading: vehicleModelDataLoading,
    error: vehicleModelDataError,
    refetch: vehicleModelDataRefetch,
    isFetching: vehicleModelDataFetching,
  } = useQuery({
    queryKey: ["fetch-vehicle-models"],
    queryFn: fetchVehicleModel,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log("vehicle model data", vehicleModelData?.data?.data);

  const handleSelectItem = (value) => {
    setSelectedVehicleModel(value);
    editModalOpen();
  };

  const handleModalClose = () => {
    setSelectedVehicleModel(null);
    editModalClose();
  };

  const {
    mutate: deleteItemMutate,
    isMutating: deleteItemMutating,
    isLoading: deleteItemMutateLoading,
  } = useMutation({
    mutationFn: (value) => deleteVehicleModel(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicleModels();
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

  if (vehicleModelDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <>
      {selectedVehicleModel && (
        <EditVehicleModelModal
          opened={editModalOpened}
          close={handleModalClose}
          data={selectedVehicleModel}
          vehicleData={vehicleData?.data?.data}
        />
      )}

      <AddVehicleModel
        opened={addDrawerOpened}
        close={addDrawerClose}
        vehicleData={vehicleData?.data?.data}
      />

      <Paper>
        <TitleBox title="Vehicle Models" />
        <Flex gap={20} py="sm" justify="flex-end">
          <Button onClick={addDrawerOpen} color="orange">
            Add Vehicle Model
          </Button>
        </Flex>
        <div>
          {!vehicleModelDataFetching && vehicleModelData?.data?.data ? (
            <VehicleModelsTable
              data={vehicleModelData?.data?.data}
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

export default VehicleModels;
