import { Flex, Grid, Modal } from "@mantine/core";
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

import Banner from "../../images/booking_banner.jpg";
import { getBadge } from "../constants/constants";
import dayjs from "dayjs";
import { updateBooking } from "../../services/bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleErrorResponse } from "../../utils/utils";
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const EditBookingModal = ({ opened, close, data }) => {
  const queryClient = useQueryClient();

  const { classes, theme } = useStyles();

  const [type, setType] = useState(data?.status);

  const {
    mutate: editBookingMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => updateBooking(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchBookings();
        toast.success("Updated Successfully!");
        close();
      }
    },
  });

  const handleEditBooking = () => {
    const values = {
      id: data?._id,
      status: type,
    };
    editBookingMutate(values);
  };

  const refetchBookings = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-bookings"],
      type: "active",
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Booking" top size="lg">
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={Banner} alt={Banner} height={180} />
        </Card.Section>

        <Grid>
          <Grid.Col md={6} lg={6} sm={12}>
            <Card.Section className={classes.section} mt="md">
              <Group position="apart">
                <Text fz="lg" fw={500}>
                  Booking Details
                </Text>
                {getBadge(data?.status)}
              </Group>
              <Flex py="sm" direction="column" gap={5}>
                <Text fw={600}>
                  ID : <Badge>{data?._id}</Badge>
                </Text>
                <Text fw={600}>Name : {data?.name}</Text>
                <Text fw={600}>Contact No. : {data?.contact}</Text>
                <Text fw={600}>Email : {data?.email}</Text>
                <Text fw={600}>Time : {data?.time ? data?.time : "N/A"}</Text>
                <Text fw={600}>
                  Date : {dayjs(data?.date).format("MMM DD, YYYY")}
                </Text>
              </Flex>
            </Card.Section>
          </Grid.Col>
          <Grid.Col md={6} lg={6} sm={12}>
            <Card.Section className={classes.section} mt="md">
              <Group position="apart">
                <Text fz="lg" fw={500}>
                  Package Details
                </Text>
                {data?.packageId?.isActive ? (
                  <Badge color="green">Active</Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )}
              </Group>

              <Flex py="sm" direction="column" gap={5}>
                <Text fw={600}>Name : {data?.packageId?.name}</Text>
                <Text fw={600}>label : {data?.packageId?.label}</Text>
                <Text fw={600}>Slug : {data?.packageId?.package_slug}</Text>
                <Text fw={600}>
                  Price : <Badge size="lg">{data?.packageId?.price} BDT</Badge>
                </Text>
                <Badge size="md">{data?.vehicleId?.vehicle_slug}</Badge>
              </Flex>
            </Card.Section>
          </Grid.Col>
        </Grid>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Check the Booking Now!
          </Text>
          <Group mt={5}>
            <Select
              value={type}
              onChange={(e) => setType(e)}
              placeholder="Select Type"
              data={[
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "cancelled", label: "Cancelled" },
              ]}
            />
          </Group>
        </Card.Section>

        <Group mt="xs">
          <Button
            radius="md"
            style={{ flex: 1 }}
            onClick={() => handleEditBooking()}
            disabled={isLoading ? true : false}
          >
            Save Changes
          </Button>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    </Modal>
  );
};

export default EditBookingModal;
