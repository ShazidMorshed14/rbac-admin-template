import { Box, Flex, Paper, Select } from "@mantine/core";
import React, { useState } from "react";
import { StatBoxes } from "../components/StatBoxes";
import {
  categoryBoxesData,
  statData,
} from "../components/constants/sampleData";
import { CategoryBoxes } from "../components/CategoryBoxes";
import Hero from "../components/Hero";
import TitleBox from "../components/global/TitleBox";
import CurrentDate from "../components/global/CurrentDate";
import CategoryBoxesCustom from "../components/CategoryBoxesCustom";
import { fetchAdminStats } from "../services/dashboard";
import { handleErrorResponse } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";
import LoadingView from "../components/global/LoadingView";

const Dashboard = () => {
  const [type, setType] = useState("all");

  const {
    data: dashboardData,
    isLoading: dashboardDataLoading,
    error: dashboardDataError,
    refetch,
    isFetching: dashboardDataFetching,
  } = useQuery({
    queryKey: ["fetch-dashboard-data", type],
    queryFn: fetchAdminStats,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      handleErrorResponse(error);
    },
  });

  console.log(dashboardData?.data?.data);

  if (dashboardDataError) return <NoDataPlaceholder apiError={true} />;

  return (
    <Paper>
      <Flex justify="space-between" align="center" py="md">
        <TitleBox title="Hello,Admin!" />
        <Flex gap={20}>
          <Select
            value={type}
            onChange={(e) => setType(e)}
            placeholder="Select Type"
            data={[
              { value: "all", label: "All" },
              { value: "today", label: "Today" },
              { value: "this_week", label: "This Week" },
              { value: "this_month", label: "This Month" },
            ]}
          />
          <CurrentDate />
        </Flex>
      </Flex>
      <StatBoxes data={statData} />
      <Box py="md">
        {!dashboardDataFetching && dashboardData?.data?.data ? (
          <CategoryBoxesCustom data={dashboardData?.data?.data} />
        ) : (
          <LoadingView />
        )}
      </Box>
    </Paper>
  );
};

export default Dashboard;
