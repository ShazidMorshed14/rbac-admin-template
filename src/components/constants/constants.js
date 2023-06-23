import { Badge } from "@mantine/core";

export const getBadge = (value) => {
  switch (value) {
    case "pending":
      return (
        <Badge variant="filled" color="yellow">
          {value}
        </Badge>
      );
    case "confirmed":
      return (
        <Badge variant="filled" color="green">
          {value}
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="filled" color="red">
          {value}
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="filled" color="red">
          {value}
        </Badge>
      );
    case "active":
      return (
        <Badge variant="filled" color="green">
          {value}
        </Badge>
      );
    case "paid":
      return (
        <Badge variant="filled" color="green">
          {value}
        </Badge>
      );
    case "unpaid":
      return (
        <Badge variant="filled" color="red">
          {value}
        </Badge>
      );

    default:
      return (
        <Badge variant="filled" color="blue">
          {value}
        </Badge>
      );
  }
};
