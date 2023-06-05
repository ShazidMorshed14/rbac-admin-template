import { Table } from "@mantine/core";
import React from "react";
import { isArrayAndHasContent } from "../utils/utils";
import NoDataPlaceholder from "./global/NoDataPlaceholder";
import dayjs from "dayjs";
import { getBadge } from "./constants/constants";
import { IconEditCircle, IconEyeCheck, IconView360 } from "@tabler/icons-react";
import { IconEyeEdit } from "@tabler/icons-react";
import TableComponent from "../common/TableComponent";

const CallBookingTable = ({ data, handleSelectBooking }) => {
  const ths = (
    <tr>
      <th>ID</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td className="mantine-table-col-left">{element._id}</td>
      <td className="mantine-table-col-left">{element.phone}</td>
      <td className="mantine-table-col-left">
        {element?.status ? getBadge(element.status) : "N/A"}
      </td>
      <td className="mantine-table-col-left">
        {element?.createdAt
          ? dayjs(element?.createdAt).format("MMM DD, YYYY")
          : "N/A"}
      </td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectBooking(element)}
      >
        <IconEyeEdit />
      </td>
    </tr>
  ));
  return (
    <>
      <TableComponent ths={ths} rows={rows} data={data} />
    </>
  );
};

export default CallBookingTable;
