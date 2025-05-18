import PlantationForm from "@/components/plantations/PlantationForm";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";

export default async function NewPlantation() {
  return (
    <SidebarWrapper>
      <Title>Formulir Kebun Baru</Title>
      <PlantationForm />
    </SidebarWrapper>
  );
}
