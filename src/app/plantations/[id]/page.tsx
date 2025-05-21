import PlantationForm from "@/components/plantations/PlantationForm";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";
import { getPlantationFromId } from "./actions";

export default async function ViewEditPlantation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plantation = await getPlantationFromId(id);
  return (
    <SidebarWrapper>
      <Title>Lihat / Edit Informasi Kebun</Title>
      <PlantationForm plantation={plantation} />
    </SidebarWrapper>
  );
}
