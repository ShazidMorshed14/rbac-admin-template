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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleErrorResponse } from "../../utils/utils";
import { toast } from "react-toastify";
import { updatePackage } from "../../services/packages";
import { convertToVehicleMenu } from "../../common/helper";
import { fetchVehicleModel } from "../../services/vehicleModel";
import { updateVehicle } from "../../services/vehicles";

const EditVehicleModal = ({ opened, close, data, vehicleData }) => {
  //console.log(data);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      id: data?._id ? data?._id : "",
      name: data?.name ? data?.name : "",
      vehicle_slug: data?.vehicle_slug ? data?.vehicle_slug : "",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      vehicle_slug: (value) =>
        value.length < 1 ? "vehicle_slug must be given" : null,
    },
  });

  const refetchVehicles = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-vehicles"],
      type: "active",
    });
  };

  const {
    mutate: editVehicleMutate,
    isMutating: editVehicleMutating,
    isLoading: editVehicleLoading,
  } = useMutation({
    mutationFn: (value) => updateVehicle(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchVehicles();
        toast.success("Updated Successfully!");
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    editVehicleMutate(values);
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
                label="Slug"
                {...form.getInputProps("vehicle_slug")}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md">
            <Button type="submit" disabled={editVehicleLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default EditVehicleModal;
