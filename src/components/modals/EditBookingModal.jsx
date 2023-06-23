import { Avatar, Center, Flex, Grid, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  IconError404,
  IconExclamationCircle,
  IconHeart,
} from "@tabler/icons-react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleErrorResponse } from "../../utils/utils";
import { toast } from "react-toastify";
import { convertToVehicleMenu } from "../../common/helper";
import { fetchAgents } from "../../services/agents";
import NoDataPlaceholder from "../global/NoDataPlaceholder";
import { fetchVendors } from "../../services/vendors";
import { openConfirmModal } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    margin: "0.5em",
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
  const [agentId, setAgentId] = useState(data?.agentId?._id);
  const [vendorId, setVendorId] = useState(data?.vendorId?._id);
  const [paymentType, setPaymentType] = useState(data?.paymentType);
  const [paymentStatus, setPaymentStatus] = useState(data?.paymentStatus);
  const [transactionId, setTransactionId] = useState(data?.transactionId);

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

  const {
    data: agentData,
    isLoading: agentDataLoding,
    error: agentDataError,
    refetch,
    isFetching: agentDataFetching,
  } = useQuery({
    queryKey: ["fetch-agents", null, null, null, null, "active"],
    queryFn: fetchAgents,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  const {
    data: vendorData,
    isLoading: vendorDataLoading,
    error: vendorDataError,
    isFetching: vendorDataFetching,
  } = useQuery({
    queryKey: ["fetch-vendors", null, null, null, null, "active"],
    queryFn: fetchVendors,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  const handleEditBooking = () => {
    const values = {
      id: data?._id,
      status: type,
      agentId: agentId,
      vendorId: vendorId,
      paymentType: paymentType,
      paymentStatus: paymentStatus,
      transactionId: transactionId,
    };
    openConfirmModal({
      title: "Confirm",
      styles: () => ({
        title: {
          fontSize: "22px",
          fontWeight: "bold",
        },
      }),
      children: (
        <Text size="sm">Are you sure you want to Save the Changes?</Text>
      ),
      confirmProps: { color: "red" },
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        editBookingMutate(values);
      },
    });
  };

  const refetchBookings = async () => {
    await queryClient.refetchQueries({
      queryKey: ["fetch-bookings"],
      type: "active",
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Booking" top fullScreen>
      <Card withBorder radius="md" p="md" className={classes.card}>
        {/* <Card.Section>
          <Image src={Banner} alt={Banner} height={180} />
        </Card.Section> */}

        <Grid gap={5}>
          <Grid.Col md={6} lg={6} sm={12}>
            <Card.Section className={classes.section} mt="md" mih="300px">
              <Group position="apart">
                <Text fz="lg" fw={600} py="xs">
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
            <Card.Section className={classes.section} mt="md" mih="300px">
              <Group position="apart">
                <Text fz="lg" fw={600} py="xs">
                  Package Details
                </Text>
                {data?.packageId?.isActive ? (
                  <Badge variant="filled" color="green">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="filled" color="red">
                    Inactive
                  </Badge>
                )}
              </Group>

              <Flex py="sm" direction="column" gap={5}>
                <Text fw={600}>Name : {data?.packageId?.name}</Text>
                <Text fw={600}>label : {data?.packageId?.label}</Text>
                <Text fw={600}>Slug : {data?.packageId?.package_slug}</Text>
                <Text fw={600}>
                  Price : <Badge size="lg">{data?.packageId?.price} BDT</Badge>
                </Text>
                <Flex direction="column">
                  <Flex>
                    <Text fz="lg" fw={600} py="xs">
                      Vehicle Details
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Text fw={600}>
                      Vehicle Type : {data?.packageId?.vehicleId?.vehicle_slug}
                    </Text>
                  </Flex>
                  {data?.packageId?.vehicleModelId ? (
                    <Flex direction="column">
                      <Text fw={600}>
                        Vehicle Model :{" "}
                        {data?.packageId?.vehicleModelId?.vehicle_model_slug}
                      </Text>
                    </Flex>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Flex>
            </Card.Section>
          </Grid.Col>
        </Grid>

        <Grid gap={5}>
          <Grid.Col md={4} lg={4} sm={12}>
            <Card.Section className={classes.section} mt="md" mih="300px">
              {data?.agentId ? (
                <div>
                  <Group position="apart">
                    <Text fz="lg" fw={600} py="xs">
                      Agent Details
                    </Text>
                    {getBadge(data?.agentId?.status)}
                  </Group>
                  <Grid>
                    <Grid.Col md={6} lg={6} sm={12}>
                      <Center>
                        <Image src={data?.agentId?.image} alt="agent" p="sm" />
                      </Center>
                    </Grid.Col>
                    <Grid.Col md={6} lg={6} sm={12}>
                      <Flex
                        direction="column"
                        py="xs"
                        gap={5}
                        justify="space-between"
                        sx={{ height: "100%" }}
                      >
                        <div>
                          <Text fw={600}>Name : {data?.agentId?.name}</Text>
                          <Text fw={600}>
                            Agent Code : {data?.agentId?.agent_code}
                          </Text>
                          <Text fw={600}>
                            Contact : {data?.agentId?.contact}
                          </Text>
                          <Text fw={600}>
                            Address : {data?.agentId?.address}
                          </Text>
                          <Text fw={600}>Email : {data?.agentId?.email}</Text>
                        </div>
                        <div>
                          <Flex py="sm" gap={20} direction="column">
                            <Text fz="lg" fw={600} py="xs">
                              Select Agent
                            </Text>
                            <Select
                              value={agentId}
                              onChange={(e) => setAgentId(e)}
                              placeholder="Select Agent"
                              data={
                                agentData?.data?.data
                                  ? convertToVehicleMenu(agentData?.data?.data)
                                  : []
                              }
                            />
                          </Flex>
                        </div>
                      </Flex>
                    </Grid.Col>
                  </Grid>
                </div>
              ) : (
                <div>
                  <Group position="apart">
                    <Text fz="lg" fw={600} py="xs">
                      Agent Details
                    </Text>
                    <Badge variant="filled" color="red">
                      No Agent Selected!
                    </Badge>
                  </Group>
                  <Flex direction="column" gap={20}>
                    <NoDataPlaceholder
                      title="No Agent Assigned!"
                      subtext="Please Assign an Agent to Confirm the Booking"
                      icon={<IconExclamationCircle size={70} color="red" />}
                    />
                    <div>
                      <Flex py="sm" align="center" justify="center" gap={20}>
                        <Text fz="lg" fw={600} py="xs">
                          Assign Agent
                        </Text>
                        <Select
                          width="100%"
                          value={agentId}
                          onChange={(e) => setAgentId(e)}
                          placeholder="Select Agent"
                          data={
                            agentData?.data?.data
                              ? convertToVehicleMenu(agentData?.data?.data)
                              : []
                          }
                        />
                      </Flex>
                    </div>
                  </Flex>
                </div>
              )}
            </Card.Section>
          </Grid.Col>

          {/* grid for vendor */}
          <Grid.Col md={4} lg={4} sm={12}>
            <Card.Section className={classes.section} mt="md" mih="300px">
              {data?.vendorId ? (
                <div>
                  <Group position="apart">
                    <Text fz="lg" fw={600} py="xs">
                      Vendor Details
                    </Text>
                    {getBadge(data?.vendorId?.status)}
                  </Group>
                  <Grid>
                    <Grid.Col md={6} lg={6} sm={12}>
                      <Center>
                        <Image src={data?.vendorId?.image} alt="agent" p="sm" />
                      </Center>
                    </Grid.Col>
                    <Grid.Col md={6} lg={6} sm={12}>
                      <Flex
                        direction="column"
                        py="xs"
                        gap={5}
                        justify="space-between"
                        sx={{ height: "100%" }}
                      >
                        <div>
                          <Text fw={600}>Name : {data?.vendorId?.name}</Text>
                          <Text fw={600}>
                            Vendor Code : {data?.vendorId?.vendor_code}
                          </Text>
                          <Text fw={600}>
                            Contact : {data?.vendorId?.contact}
                          </Text>
                          <Text fw={600}>
                            Address : {data?.vendorId?.address}
                          </Text>
                          <Text fw={600}>Email : {data?.vendorId?.email}</Text>
                        </div>
                        <div>
                          <Flex py="sm" direction="column" gap={20}>
                            <Text fz="lg" fw={600} py="xs">
                              Select Vendor
                            </Text>
                            <Select
                              value={vendorId}
                              onChange={(e) => setVendorId(e)}
                              placeholder="Select Vendor"
                              data={
                                vendorData?.data?.data
                                  ? convertToVehicleMenu(vendorData?.data?.data)
                                  : []
                              }
                            />
                          </Flex>
                        </div>
                      </Flex>
                    </Grid.Col>
                  </Grid>
                </div>
              ) : (
                <div>
                  <Group position="apart">
                    <Text fz="lg" fw={600} py="xs">
                      Vendor Details
                    </Text>
                    <Badge variant="filled" color="red">
                      No Vendor Selected!
                    </Badge>
                  </Group>
                  <Flex direction="column" gap={20}>
                    <NoDataPlaceholder
                      title="No Vendor Assigned!"
                      subtext="Please Assign a Vendor to Confirm the Booking"
                      icon={<IconExclamationCircle size={70} color="red" />}
                    />
                    <div>
                      <Flex py="sm" align="center" justify="center" gap={20}>
                        <Text fz="lg" fw={600} py="xs">
                          Assign Vendor
                        </Text>
                        <Select
                          width="100%"
                          value={vendorId}
                          onChange={(e) => setVendorId(e)}
                          placeholder="Select Vendor"
                          data={
                            vendorData?.data?.data
                              ? convertToVehicleMenu(vendorData?.data?.data)
                              : []
                          }
                        />
                      </Flex>
                    </div>
                  </Flex>
                </div>
              )}
            </Card.Section>
          </Grid.Col>

          {/* grid for payment */}
          <Grid.Col md={4} lg={4} sm={12}>
            <Card.Section className={classes.section} mt="md" mih="300px">
              <Group position="apart">
                <Text fz="lg" fw={600} py="xs">
                  Payment Details
                </Text>
                {getBadge(data?.paymentStatus)}
              </Group>
              <Flex direction="column" gap={5}>
                <Select
                  label="Select Payment Type"
                  withAsterisk
                  value={paymentType}
                  onChange={(e) => setPaymentType(e)}
                  placeholder="Select Payment Type"
                  required
                  data={[
                    { label: "cash", value: "cash" },
                    { label: "bkash", value: "bkash" },
                    { label: "nagad", value: "nagad" },
                    { label: "other", value: "other" },
                  ]}
                />
                <Select
                  label="Select Payment Status"
                  withAsterisk
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e)}
                  placeholder="Select Payment Status"
                  required
                  data={[
                    { label: "unpaid", value: "unpaid" },
                    { label: "paid", value: "paid" },
                  ]}
                />
                <TextInput
                  value={transactionId}
                  withAsterisk={
                    paymentType == "bkash" || paymentType == "nagad"
                      ? true
                      : false
                  }
                  label="Transaction ID"
                  placeholder="Ex. 125464541"
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {paymentType == "bkash" || paymentType == "nagad" ? (
                  <Text fz="xs" fw={600} color="red">
                    Please Provide the transactionId for online payment****
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
            </Card.Section>
          </Grid.Col>
        </Grid>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Check the Booking Now!
          </Text>
          <Group mt={5} position="apart">
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
            <Flex mt="xs" align="center" gap={20}>
              <Button
                radius="md"
                color="red"
                onClick={() => {
                  close();
                }}
              >
                Cancel
              </Button>
              <Button
                radius="md"
                onClick={() => handleEditBooking()}
                disabled={isLoading ? true : false}
              >
                Save Changes
              </Button>
            </Flex>
          </Group>
        </Card.Section>
      </Card>
    </Modal>
  );
};

export default EditBookingModal;
