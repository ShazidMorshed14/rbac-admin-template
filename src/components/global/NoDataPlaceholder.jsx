import { Stack, Text } from "@mantine/core";
import { IconBox, IconError404 } from "@tabler/icons-react";
import React from "react";

const NoDataPlaceholder = ({
  title,
  subtext,
  icon,
  apiError = false,
  ...rest
}) => {
  if (apiError)
    return (
      <Stack w="100%" h={390} align="center" justify="center" {...rest}>
        <IconError404 size={70} color="red" />
        <Text size="xl" weight={700}>
          Something went wrong
        </Text>
        <Text size="sm" weight={300} color="dimmed">
          Please contact admin to see what is wrong or refresh after some time.
        </Text>
      </Stack>
    );
  return (
    <Stack w="100%" h={390} align="center" justify="center" {...rest}>
      {icon || <IconBox size={70} color="blue" />}
      <Text size="xl" weight={700}>
        {title || "No Data"}
      </Text>
      <Text size="sm" weight={300} color="dimmed">
        {subtext || "No data available at the moment"}
      </Text>
    </Stack>
  );
};

export default NoDataPlaceholder;
