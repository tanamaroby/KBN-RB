import SidebarWrapper from "@/components/sidebar-wrapper";
import AgGridTable from "@/components/table/ag-grid-table";
import Title from "@/components/title";

export default async function Blocks() {
  return (
    <SidebarWrapper>
      <Title>Blocks</Title>
      <AgGridTable />
    </SidebarWrapper>
  );
}
