import { Flex, Title } from "@mantine/core";
import React from "react";

const TitleBox = ({ title }) => {
  return (
    <Flex justify="flex-start">
      <Title size="h3">{title}</Title>
    </Flex>
  );
};

export default TitleBox;
