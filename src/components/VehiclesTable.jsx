import { Badge, Box, Flex, Table } from "@mantine/core";
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

const VehiclesTable = ({ data, handleSelectItem, handleDeleteItem }) => {
  const ths = (
    <tr>
      <th>ID</th>
      <th>name</th>
      <th>created</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td className="mantine-table-col-left">{element?._id}</td>
      <td className="mantine-table-col-left">{element?.name}</td>
      <td className="mantine-table-col-left">
        {" "}
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

export default VehiclesTable;
