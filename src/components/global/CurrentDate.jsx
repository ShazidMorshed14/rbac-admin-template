import { Box, Title } from "@mantine/core";
import React from "react";

function CurrentDate() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box>
      <Title size="h3">{currentDate}</Title>
    </Box>
  );
}

export default CurrentDate;
