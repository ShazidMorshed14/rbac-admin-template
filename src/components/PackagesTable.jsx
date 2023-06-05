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

const PackagesTable = ({ data, handleSelectPackage, handlePackageDelete }) => {
  const ths = (
    <tr>
      <th>ID</th>
      <th>name</th>
      <th>label</th>
      <th>slug</th>
      <th>Vehicle</th>
      <th>price</th>
      <th>status</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td className="mantine-table-col-left">{element?._id}</td>
      <td className="mantine-table-col-left">{element?.name}</td>
      <td className="mantine-table-col-left">{element?.label}</td>
      <td className="mantine-table-col-left">{element?.package_slug}</td>
      <td className="mantine-table-col-left">
        {element?.vehicleId?.vehicle_slug}
      </td>
      <td className="mantine-table-col-left">{element?.price}</td>
      <td className="mantine-table-col-left">
        {element?.isActive ? (
          <Badge color="green">active</Badge>
        ) : (
          <Badge color="red">Inactive</Badge>
        )}
      </td>
      <td>
        <Flex gap={5} justify="space-between">
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectPackage(element)}
          >
            <IconEyeEdit />
          </Box>

          <Box
            style={{ cursor: "pointer" }}
            onClick={async () => await handlePackageDelete(element._id)}
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

export default PackagesTable;
