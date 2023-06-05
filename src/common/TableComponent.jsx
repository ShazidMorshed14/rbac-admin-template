import { Table } from "@mantine/core";
import React from "react";
import { isArrayAndHasContent } from "../utils/utils";
import NoDataPlaceholder from "../components/global/NoDataPlaceholder";

const TableComponent = ({ ths, rows, data }) => {
  return (
    <>
      {isArrayAndHasContent(data) ? (
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <NoDataPlaceholder />
      )}
    </>
  );
};

export default TableComponent;
