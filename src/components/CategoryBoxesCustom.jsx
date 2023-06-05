import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  Flex,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CategoryBox from "./CategoryBox";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const CategoryBoxesCustom = ({ data }) => {
  return (
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
        path="/"
        value={data?.totalPackages}
        color="violet"
      />
    </SimpleGrid>
  );
};

export default CategoryBoxesCustom;
