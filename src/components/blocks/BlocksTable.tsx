"use client";

import AgGridTable from "@/components/table/ag-grid-table";
import {
  mockColDefs,
  mockRowData,
  ProductRowData,
} from "@/lib/mocks/MOCK_AG_GRID";
import { ColDef } from "ag-grid-community";
import React from "react";

const BlocksTable: React.FC = () => {
  const columnDefs: ColDef<ProductRowData>[] = mockColDefs;

  const rowData: ProductRowData[] = mockRowData;

  return (
    <AgGridTable
      rowData={rowData}
      columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={20}
      paginationPageSizeSelector={[10, 20, 50, 100]}
    />
  );
};

export default BlocksTable;
