import { Table } from "@mantine/core";
import React from "react";
import { isArrayAndHasContent } from "../utils/utils";
import NoDataPlaceholder from "./global/NoDataPlaceholder";
import dayjs from "dayjs";
import { getBadge } from "./constants/constants";
import { IconEditCircle, IconEyeCheck, IconView360 } from "@tabler/icons-react";
import { IconEyeEdit } from "@tabler/icons-react";
import TableComponent from "../common/TableComponent";

const BookingsTable = ({ data, handleSelectBooking }) => {
  const ths = (
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Contact</th>
      <th>Email</th>
      <th>Vehicle</th>
      <th>Package</th>
      <th>Time</th>
      <th>Status</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td>{element._id}</td>
      <td>{element.name}</td>
      <td>{element.contact}</td>
      <td>{element.email}</td>
      <td>{element?.vehicleId?.name}</td>
      <td>{element?.packageId?.name}</td>
      <td>{element?.time ? element?.time : "N/A"}</td>
      <td>{element?.status ? getBadge(element.status) : "N/A"}</td>
      <td>
        {element?.date ? dayjs(element?.date).format("MMM DD, YYYY") : "N/A"}
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

export default BookingsTable;
