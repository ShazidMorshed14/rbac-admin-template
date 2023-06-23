import { Avatar, Box, Center, Flex, Table } from "@mantine/core";
import React from "react";
import { isArrayAndHasContent } from "../utils/utils";
import NoDataPlaceholder from "./global/NoDataPlaceholder";
import dayjs from "dayjs";
import { getBadge } from "./constants/constants";
import {
  IconEditCircle,
  IconEyeCheck,
  IconTrash,
  IconView360,
} from "@tabler/icons-react";
import { IconEyeEdit } from "@tabler/icons-react";
import TableComponent from "../common/TableComponent";

const VendorsTable = ({ data, handleSelectItem, handleDeleteItem }) => {
  const ths = (
    <tr>
      <th>Name</th>
      <th>Vendor Code</th>
      <th>Contact</th>
      <th>Email</th>
      <th>Address</th>
      <th>Imgae</th>
      <th>Status</th>
      <th>Created</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td>{element?.name}</td>
      <td>{element?.vendor_code}</td>
      <td>{element?.contact}</td>
      <td>{element?.email}</td>
      <td>{element?.address}</td>

      <td>
        {element?.image ? (
          <Center>
            <Avatar radius="xl" src={element?.image} alt="agent" />
          </Center>
        ) : (
          "N/A"
        )}
      </td>
      <td>{element?.status ? getBadge(element.status) : "N/A"}</td>
      <td>
        {element?.createdAt
          ? dayjs(element?.createdAt).format("MMM DD, YYYY")
          : "N/A"}
      </td>
      <td>
        <Flex gap={5} justify="space-between">
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectItem(element)}
          >
            <IconEyeEdit />
          </Box>

          <Box
            style={{ cursor: "pointer" }}
            onClick={async () => await handleDeleteItem(element._id)}
          >
            <IconTrash />
          </Box>
        </Flex>
      </td>
    </tr>
  ));
  return (
    <>
      <TableComponent ths={ths} rows={rows} data={data} />
    </>
  );
};

export default VendorsTable;
