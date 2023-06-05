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
import React, { useState } from "react";
import {
  convertToPackageMenu,
  convertToVehicleMenu,
} from "../../common/helper";
import { toast } from "react-toastify";
import { addPackage, fetchPackages } from "../../services/packages";
import { handleErrorResponse, isArrayAndHasContent } from "../../utils/utils";
import { fetchVehicles } from "../../services/vehicles";
import { initiateBooking } from "../../services/bookings";
import { DateInput } from "@mantine/dates";

const AddBooking = ({ opened, close }) => {
  const queryClient = useQueryClient();

  const [timePicker] = useState([
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
  ]);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      date: "",
      time: "",
      vehicleId: null,
      packageId: null,
      terms: false,
    },

    validate: {
      name: (value) => (value.length < 1 ? "Name must be given" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      contact: (value) => (value == "" ? "contact must be given" : null),
      date: (value) => (value == "" ? "date must be given" : null),
      vehicleId: (value) => (value == "" ? "vehicle must be choosen" : null),
      packageId: (value) => (value == "" ? "package must be choosen" : null),
    },
  });

  const {
    data: vehicleList,
    isLoading: vehicleListLoading,
    error,
    isFetching,
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

  console.log("vehicle list", vehicleList?.data?.data);

  const {
    data: packageList,
    isLoading: packageListLoading,
    error: packageListError,
    isFetching: packageListIsFetching,
  } = useQuery({
    queryKey: ["fetch-packages", null, null, true, form.values.vehicleId],
    queryFn: fetchPackages,
    enabled: form.values.vehicleId ? true : false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log("package list", packageList?.data?.data);

  const {
    mutate: bookingMutate,
    isLoading: isBookingLoading,
    isMutating,
  } = useMutation({
    mutationFn: (value) => initiateBooking(value),
    onError: (error) => {
      console.log(error.response.data.message);
    },
    onSuccess: (response) => {
      if (response) {
        toast.success("Booking Placed successfully!");
        refetchBookings();
        form.reset();
        close();
      }
    },
  });

  const refetchBookings = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-bookings"],
      type: "active",
    });
  };

  const handleDateChange = (event) => {
    form.setValues({
      date: event.target.value,
    });
    console.log(form.values);
  };

  const handleVehicleId = (event) => {
    form.setValues({
      vehicleId: event,
    });
  };

  const handlePackageId = (event) => {
    form.setValues({
      packageId: event,
    });
  };

  const handleTimePick = (event) => {
    form.setValues({
      time: event,
    });
  };

  const handleSubmit = (values) => {
    console.log(values);
    bookingMutate(values);
  };

  const handleCancel = () => {
    form.reset();
    close();
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Create Booking"
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
                placeholder="Ex. test@gmail.com"
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <TextInput
                withAsterisk
                label="Contact"
                placeholder="Ex. 01234567891"
                {...form.getInputProps("contact")}
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Flex direction="column">
                <label style={{ fontWeight: 600 }}>Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  aria-labelledby="date"
                  value={form.values.date}
                  onChange={handleDateChange}
                  style={{
                    padding: "0.5em",
                    borderColor: "#e5e5e5",
                    borderRadius: "8px",
                  }}
                />
              </Flex>
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                label="Select Vehicle Type"
                withAsterisk
                value={form.values.vehicleId}
                onChange={handleVehicleId}
                placeholder="Select Vehicle Type"
                required
                data={
                  vehicleList?.data?.data
                    ? convertToVehicleMenu(vehicleList?.data?.data)
                    : []
                }
              />
            </Grid.Col>

            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                label="Select Package"
                withAsterisk
                value={form.values.packageId}
                onChange={handlePackageId}
                placeholder="Select Package"
                disabled={packageListIsFetching}
                data={
                  packageList?.data?.data
                    ? convertToPackageMenu(packageList?.data?.data)
                    : []
                }
                required
              />
            </Grid.Col>
            <Grid.Col md={12} lg={12} sm={12} py="sm">
              <Select
                label="Select Time (optional)"
                value={form.values.time}
                onChange={handleTimePick}
                placeholder="Select time"
                data={timePicker}
              />
            </Grid.Col>
          </Grid>

          <Group position="right" mt="md" gap={5}>
            <Button onClick={handleCancel} color="red">
              Cancel
            </Button>
            <Button type="submit" disabled={isBookingLoading} color="orange">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Drawer>
  );
};

export default AddBooking;
