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

const CategoryBox = ({ path, title, value, color }) => {
  const navigate = useNavigate();
  return (
    <Paper
      withBorder
      radius="md"
      p="xs"
      key={1}
      onClick={() => navigate(path)}
      style={{ cursor: "pointer" }}
      shadow="md"
    >
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: 30, color: color }]}
          label={
            <Center>
              <IconArrowUpRight size="1.4rem" stroke={1.5} />
            </Center>
          }
        />

        <Flex justify="flex-start" direction="column">
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {title}
          </Text>
          <Text weight={700} size="xl">
            {value}
          </Text>
        </Flex>
      </Group>
    </Paper>
  );
};

export default CategoryBox;
