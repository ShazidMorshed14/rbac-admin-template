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

import Banner from "../../images/call_booking.jpg";
import { getBadge } from "../constants/constants";
import dayjs from "dayjs";
import { updateBooking, updateCallBooking } from "../../services/bookings";
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

const EditCallBookingModal = ({ opened, close, data }) => {
  const queryClient = useQueryClient();

  const { classes, theme } = useStyles();

  const [type, setType] = useState(data?.status);

  const {
    mutate: editCallBookingMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => updateCallBooking(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchCallBookings();
        toast.success("Updated Successfully!");
        close();
      }
    },
  });

  const handleEditCallBooking = () => {
    const values = {
      id: data?._id,
      status: type,
    };
    editCallBookingMutate(values);
  };

  const refetchCallBookings = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-call-bookings"],
      type: "active",
    });
  };
  return (
    <Modal opened={opened} onClose={close} title="Call Booking" top size="lg">
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={Banner} alt={Banner} height={180} />
        </Card.Section>

        <Grid>
          <Grid.Col md={12} lg={12} sm={12}>
            <Card.Section className={classes.section} mt="md">
              <Group position="apart">
                <Text fz="lg" fw={500}>
                  Call Booking Details
                </Text>
                {getBadge(data?.status)}
              </Group>
              <Flex py="sm" direction="column" gap={5}>
                <Text fw={600}>
                  ID : <Badge>{data?._id}</Badge>
                </Text>
                <Text fw={600}>Contact No. : {data?.phone}</Text>
                <Text fw={600}>
                  Date : {dayjs(data?.date).format("MMM DD, YYYY")}
                </Text>
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
            onClick={() => handleEditCallBooking()}
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

export default EditCallBookingModal;
