"use client";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeMaterial,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import * as React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  height?: number | string;
}

const AgGridTable: React.FC<AgGridTableProps> = (props) => {
  const { height } = props;

  const [rowData, setRowData] = React.useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const [colDefs, setColDefs] = React.useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div
      style={{
        width: "100%",
        height: height || "100%",
      }}
    >
      <AgGridReact
        theme={themeMaterial}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default AgGridTable;
