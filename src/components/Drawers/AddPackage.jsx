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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { convertToVehicleMenu } from "../../common/helper";
import { toast } from "react-toastify";
import { addPackage } from "../../services/packages";
import { handleErrorResponse } from "../../utils/utils";

const AddPackage = ({ opened, close, vehicleData }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      label: "",
      price: "",
      vehicleId: "",
      isActive: false,
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      label: (value) => (value.length < 1 ? "label must be given" : null),
      price: (value) => (value == "" ? "price must be given" : null),
      vehicleId: (value) => (value == "" ? "vehicle must be choosen" : null),
    },
  });

  const handleVehicleId = (event) => {
    form.setValues({
      vehicleId: event,
    });
  };

  const refetchPackages = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-packages"],
      type: "active",
    });
  };

  const {
    mutate: addPackageUpdateMutate,
    isMutating: addPackageUpdateMutating,
    isLoading: addPackageUpdateLoading,
  } = useMutation({
    mutationFn: (value) => addPackage(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchPackages();
        toast.success("Added Successfully!");
        form.reset();
        close();
      }
    },
  });

  const handleCheckboxChange = (event) => {
    const newValue = event.currentTarget.checked;
    console.log("newValue", newValue);
    form.setValues({
      isActive: newValue,
    });
    console.log(form.values);
  };
  const handleSubmit = (values) => {
    addPackageUpdateMutate(values);
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add Package"
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
                placeholder="Ex. John Doe"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                label="label"
                placeholder="Ex. full day(9am-9pm):6000Tk"
                {...form.getInputProps("label")}
              />
            </Grid.Col>

            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                label="Price"
                placeholder="Ex. 6000"
                {...form.getInputProps("price")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                value={form.values.vehicleId}
                onChange={handleVehicleId}
                placeholder="Select Vehicle Type"
                data={vehicleData ? convertToVehicleMenu(vehicleData) : []}
              />
            </Grid.Col>
            <Flex gap={5} justify="flex-start" align="center" py="sm">
              <input
                type="checkbox"
                checked={form.values.isActive}
                onChange={handleCheckboxChange}
              />
              <label style={{ fontWeight: 600 }}>Active</label>
            </Flex>
          </Grid>

          <Group position="right" mt="md">
            <Button
              type="submit"
              disabled={addPackageUpdateLoading}
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

export default AddPackage;
