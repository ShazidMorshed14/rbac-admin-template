import {
  Anchor,
  Checkbox,
  Flex,
  Grid,
  Modal,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  Select,
} from "@mantine/core";

import Banner from "../../images/call_booking.jpg";
import { getBadge } from "../constants/constants";
import dayjs from "dayjs";
import { updateBooking, updateCallBooking } from "../../services/bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleErrorResponse } from "../../utils/utils";
import { toast } from "react-toastify";
import { updatePackage } from "../../services/packages";
import { convertToVehicleMenu } from "../../common/helper";

const EditPackageModal = ({ opened, close, data, vehicleData }) => {
  //console.log(data);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      id: data?._id ? data?._id : "",
      name: data?.name ? data?.name : "",
      label: data?.label ? data?.label : "",
      package_slug: data?.package_slug ? data?.package_slug : "",
      price: data?.price ? data?.price : "",
      vehicleId: data?.vehicleId?._id ? data?.vehicleId?._id : "",
      isActive: data?.isActive ? true : false,
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      label: (value) => (value.length < 1 ? "label must be given" : null),
      package_slug: (value) =>
        value.length < 1 ? "package_slug must be given" : null,
      price: (value) => (value == "" ? "price must be given" : null),
    },
  });

  const handleCheckboxChange = (event) => {
    const newValue = event.currentTarget.checked;
    console.log(newValue);
    form.setValues({
      isActive: newValue,
    });
    console.log(form.values);
  };

  const handleVehicleId = (event) => {
    form.setValues({
      vehicleId: event,
    });
    console.log(form.values);
  };

  const refetchPackages = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-packages"],
      type: "active",
    });
  };

  const {
    mutate: editPackageUpdateMutate,
    isMutating: editPackageUpdateMutating,
    isLoading: editPackageUpdateLoading,
  } = useMutation({
    mutationFn: (value) => updatePackage(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchPackages();
        toast.success("Updated Successfully!");
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    editPackageUpdateMutate(values);
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Package" top size="lg">
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
                label="Slug"
                placeholder="Ex. chander-gari-package-full-day"
                {...form.getInputProps("package_slug")}
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
            <Button type="submit" disabled={editPackageUpdateLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default EditPackageModal;
