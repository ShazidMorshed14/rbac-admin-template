import { Badge } from "@mantine/core";

export const getBadge = (value) => {
  switch (value) {
    case "pending":
      return <Badge color="yellow">{value}</Badge>;
    case "confirmed":
      return <Badge color="green">{value}</Badge>;
    case "cancelled":
      return <Badge color="red">{value}</Badge>;

    default:
      return <Badge color="blue">{value}</Badge>;
  }
};
