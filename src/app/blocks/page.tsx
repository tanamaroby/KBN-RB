import BlocksTable from "@/components/blocks/BlocksTable";
import CurrentTeamIndicator from "@/components/current-team-indicator";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";

export default async function Blocks() {
  return (
    <SidebarWrapper>
      <Title>Blocks</Title>
      <CurrentTeamIndicator />
      <BlocksTable />
    </SidebarWrapper>
  );
}
