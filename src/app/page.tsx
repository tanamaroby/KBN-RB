import CurrentTeamIndicator from "@/components/current-team-indicator";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";

export default async function Home() {
  return (
    <SidebarWrapper>
      <Title>Dashboard</Title>
      <CurrentTeamIndicator />
    </SidebarWrapper>
  );
}
