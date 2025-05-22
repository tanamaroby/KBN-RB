"use client";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import * as React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  height?: number | string;
  rowData: any[];
  columnDefs: ColDef[];
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[] | boolean;
}

const AgGridTable: React.FC<AgGridTableProps> = (props) => {
  const {
    height,
    rowData = [],
    columnDefs = [],
    pagination,
    paginationPageSize,
    paginationPageSizeSelector,
  } = props;

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
  };

  return (
    // Ensure rowData and columnDefs are available before rendering
    <div
      style={{
        width: "100%",
        height: height || "100%",
      }}
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={pagination ? paginationPageSize : undefined}
        paginationPageSizeSelector={
          pagination ? paginationPageSizeSelector : undefined
        }
      />
    </div>
  );
};

export default AgGridTable;
