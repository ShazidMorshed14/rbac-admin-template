import {
  Drawer,
  Grid,
  TextInput,
  Flex,
  Group,
  Button,
  Select,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { convertToVehicleMenu } from "../../common/helper";
import { toast } from "react-toastify";
import { addPackage } from "../../services/packages";
import { handleErrorResponse } from "../../utils/utils";
import {
  addVehicleModel,
  fetchVehicleModel,
} from "../../services/vehicleModel";
import { addVehicle } from "../../services/vehicles";

const AddVehicleModel = ({ opened, close, vehicleData }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      vehicleId: "",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      vehicleId: (value) => (value == "" ? "vehicle must be choosen" : null),
    },
  });

  const handleVehicleId = (event) => {
    form.setValues({
      vehicleId: event,
    });
  };

  const refetchVehicleModels = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicle-models"],
      type: "active",
    });
  };

  const {
    mutate: addVehicleModelMutate,
    isMutating: addVehicleModelMutating,
    isLoading: addVehicleModelLoading,
  } = useMutation({
    mutationFn: (value) => addVehicleModel(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicleModels();
        toast.success("Added Successfully!");
        form.reset();
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    addVehicleModelMutate(values);
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add Vehicle Model"
      overlayProps={{ opacity: 0.5, blur: 4 }}
      position="right"
      size="xl"
    >
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                required
                label="Name"
                placeholder="Ex. Suzuki Gixxer"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                withAsterisk
                required
                label="Select Vehicle Type"
                value={form.values.vehicleId}
                onChange={handleVehicleId}
                placeholder="Select Vehicle Type"
                data={vehicleData ? convertToVehicleMenu(vehicleData) : []}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button
              type="submit"
              disabled={addVehicleModelLoading}
              color="orange"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Drawer>
  );
};

export default AddVehicleModel;
