import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  Flex,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconUsersGroup,
  IconBike,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CategoryBox from "./CategoryBox";
import BigCategoryBox from "./BigCategoryBox";
import { IconUserShare } from "@tabler/icons-react";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const CategoryBoxesCustom = ({ data }) => {
  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <CategoryBox
          title="Total Bookings"
          path="/bookings"
          value={data?.totalBookings}
          color="blue"
        />

        <CategoryBox
          title="Total Call Bookings"
          path="/call-bookings"
          value={data?.totalCallBookings}
          color="green"
        />

        <CategoryBox
          title="Total Packages"
          path="/packages"
          value={data?.totalPackages}
          color="violet"
        />
      </SimpleGrid>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} py="md">
        <BigCategoryBox
          title="Total Agents"
          path="/agents"
          value={data?.totalAgents}
          color="red"
          icon={<IconUsersGroup size={50} color="blue" />}
        />

        <BigCategoryBox
          title="Total Vendors"
          path="/vendors"
          value={data?.totalVendors}
          color="blue"
          icon={<IconUserShare size={50} color="red" />}
        />

        <BigCategoryBox
          title="Total Vehicles"
          path="/vehicles"
          value={data?.totalVehicle}
          color="violet"
          icon={<IconBike size={50} color="orange" />}
        />
      </SimpleGrid>
    </>
  );
};

export default CategoryBoxesCustom;
