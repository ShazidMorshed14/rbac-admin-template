import {
  Drawer,
  Grid,
  TextInput,
  Flex,
  Group,
  Button,
  Select,
  Paper,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { convertToVehicleMenu } from "../../common/helper";
import { toast } from "react-toastify";
import { addPackage } from "../../services/packages";
import { generateUniqueCode, handleErrorResponse } from "../../utils/utils";
import { fetchVehicleModel } from "../../services/vehicleModel";
import { addVehicle } from "../../services/vehicles";
import { addNewAgent, editAgent } from "../../services/agents";

const EditAgent = ({ opened, close, data }) => {
  //console.log("selected agent", data);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      _id: data?._id,
      name: data?.name ? data?.name : "",
      email: data?.email ? data?.email : "",
      contact: data?.contact ? data?.contact : "",
      address: data?.address ? data?.address : "",
      status: data?.status ? data?.status : "inactive",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      email: (value) => (value.length < 1 ? "email must be given" : null),
      contact: (value) => (value.length < 1 ? "contact must be given" : null),
    },
  });

  const refetchVehicles = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-agents"],
      type: "active",
    });
  };

  const {
    mutate: editAgentMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => editAgent(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicles();
        toast.success("Updated Successfully!");
        form.reset();
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    editAgentMutate(values);
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Edit Agent Details"
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
                label="Email"
                placeholder="Ex. example@gmail.com"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                label="Contact"
                placeholder="Ex. +8801234567891"
                {...form.getInputProps("contact")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Textarea
                label="Address"
                placeholder="Ex. kolatoli,Shugandha"
                {...form.getInputProps("address")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                value={form.values.status}
                onChange={(e) => form.setFieldValue("status", e)}
                placeholder="Select Type"
                label="Select Type"
                data={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button type="submit" disabled={isLoading} color="orange">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Drawer>
  );
};

export default EditAgent;
