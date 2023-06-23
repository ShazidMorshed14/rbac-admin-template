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
import { fetchVehicleModel } from "../../services/vehicleModel";
import { addVehicle } from "../../services/vehicles";

const AddVehicle = ({ opened, close, vehicleData }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
    },
  });

  const refetchVehicles = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicles"],
      type: "active",
    });
  };

  const {
    mutate: addVehicleMutate,
    isMutating: addVehicleMutating,
    isLoading: addVehicleLoading,
  } = useMutation({
    mutationFn: (value) => addVehicle(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicles();
        toast.success("Added Successfully!");
        form.reset();
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    addVehicleMutate(values);
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add Vehicle"
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
                label="Name"
                placeholder="Ex. Cycle"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button type="submit" disabled={addVehicleLoading} color="orange">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Drawer>
  );
};

export default AddVehicle;
