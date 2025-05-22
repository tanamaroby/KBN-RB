"use client";

import { getPlantationHistoryFromIdSortedByDate } from "@/app/plantations/actions";
import { useUser } from "@/stores/user-store";
import { ColDef } from "ag-grid-community";
import * as React from "react";
import toast from "react-hot-toast";
import { PlantationHistory } from "../../../generated/prisma";
import AgGridTable from "../table/ag-grid-table";

/* --------------------------------- AG GRID -------------------------------- */
const agGridColDef: ColDef[] = [
  {
    headerName: "Tanggal",
    field: "recordedAt",
    filter: "agDateColumnFilter",
    sortable: true,
    width: 130,
    pinned: "left",
    resizable: false,
  },
  {
    headerName: "Name",
    field: "name",
    filter: "agTextColumnFilder",
    sortable: true,
  },
  {
    headerName: "Code",
    field: "code",
    filter: "agTextColumnFilder",
    sortable: true,
  },
  {
    headerName: "Action",
    field: "action",
    filter: "agTextColumnFilder",
    sortable: true,
  },
  {
    headerName: "Location",
    field: "location",
    minWidth: 320,
    filter: "agTextColumnFilder",
    sortable: true,
  },
  {
    headerName: "Total Area (Ha)",
    field: "areaTotalHa",
    minWidth: 180,
    filter: "agNumberColumnFilter",
    sortable: true,
  },
  {
    headerName: "Nama Pemilik",
    field: "ownerCompany",
    filter: "agTextColumnFilter",
    minWidth: 200,
    sortable: true,
  },
  {
    headerName: "Nama Manager",
    field: "managerName",
    filter: "agTextColumnFilter",
    minWidth: 200,
    sortable: true,
  },
  {
    headerName: "Nomor HP",
    field: "contactNumber",
    filter: "agTextColumnFilter",
    minWidth: 200,
    sortable: true,
  },
  {
    headerName: "Latitude",
    field: "latitude",
    filter: "agNumberColumnFilter",
    minWidth: 120,
  },
  {
    headerName: "Longitude",
    field: "longitude",
    filter: "agNumberColumnFilter",
    minWidth: 120,
  },
  {
    headerName: "Keterangan",
    field: "notes",
    filter: "agTextColumnFilter",
    minWidth: 350,
  },
  {
    headerName: "Nama Pembuat Record",
    field: "recordedBy",
    filter: "agTextColumnFilter",
    sortable: true,
    minWidth: 220,
  },
];

interface PlantationHistoryComponentProps {}

const PlantationHistoryComponent: React.FC<
  PlantationHistoryComponentProps
> = () => {
  const [plantationHistories, setPlantationHistories] = React.useState<
    PlantationHistory[] | null
  >(null);
  const [loading, setLoading] = React.useState(true);

  const { selectedPlantationId } = useUser();

  React.useEffect(() => {
    if (!selectedPlantationId) {
      setLoading(false);
      return;
    }

    const fetchSelectedPlantationHistory = async () => {
      const histories = await getPlantationHistoryFromIdSortedByDate(
        selectedPlantationId
      );
      setPlantationHistories(histories);
    };

    try {
      fetchSelectedPlantationHistory();
    } catch (error) {
      toast.error("Terjadi kesalahan saat memuat sejarah kebun.");
    } finally {
      setLoading(false);
    }
  }, [selectedPlantationId]);

  return (
    <AgGridTable
      rowData={plantationHistories || []}
      columnDefs={agGridColDef}
      loading={loading}
      height={600}
      pagination
      paginationPageSize={20}
    />
  );
};

export default PlantationHistoryComponent;
