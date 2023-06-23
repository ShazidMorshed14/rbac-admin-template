import {
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { convertToVehicleMenu } from "../../common/helper";
import { updateVehicleModel } from "../../services/vehicleModel";
import { handleErrorResponse } from "../../utils/utils";

const EditVehicleModelModal = ({ opened, close, data, vehicleData }) => {
  //console.log(data);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      id: data?._id ? data?._id : "",
      name: data?.name ? data?.name : "",
      vehicle_model_slug: data?.vehicle_model_slug
        ? data?.vehicle_model_slug
        : "",
      vehicleId: data?.vehicleId?._id ? data?.vehicleId?._id : "",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      vehicle_model_slug: (value) =>
        value.length < 1 ? "vehicle_model_slug must be given" : null,
    },
  });

  const refetchVehicleModels = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicle-models"],
      type: "active",
    });
  };

  const {
    mutate: editVehicleModelMutate,
    isMutating: editVehicleModelMutating,
    isLoading: editVehicleModelLoading,
  } = useMutation({
    mutationFn: (value) => updateVehicleModel(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicleModels();
        toast.success("Updated Successfully!");
        close();
      }
    },
  });

  const handleVehicleId = (event) => {
    form.setValues({
      vehicleId: event,
    });
    console.log(form.values);
  };

  const handleSubmit = (values) => {
    editVehicleModelMutate(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit Vehicle Model"
      top
      size="lg"
    >
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Ex. Yamaha R15"
                {...form.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                value={form.values.vehicle_model_slug}
                withAsterisk
                label="Slug"
                {...form.getInputProps("vehicle_model_slug")}
              />
            </Grid.Col>

            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                label="Select Vehicle"
                required
                withAsterisk
                value={form.values.vehicleId}
                onChange={handleVehicleId}
                placeholder="Select Vehicle Type"
                data={vehicleData ? convertToVehicleMenu(vehicleData) : []}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button type="submit" disabled={editVehicleModelLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default EditVehicleModelModal;
