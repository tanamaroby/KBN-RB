import PlantationComponent from "@/components/plantations/PlantationComponent";
import PlantationHistoryComponent from "@/components/plantations/PlantationHistoryComponent";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Plantations() {
  return (
    <SidebarWrapper>
      <Title>Sejarah Kebun Yang Dipilih</Title>
      <PlantationHistoryComponent />
      <Separator dir="horizontal" />
      <div className="flex justify-between items-center">
        <Title>List Kebun</Title>
        <Link href="/plantations/new">
          <Button className="flex gap-1 items-center justify-center">
            <PlusIcon />
            <p>Tambah Kebun Baru</p>
          </Button>
        </Link>
      </div>
      <PlantationComponent />
    </SidebarWrapper>
  );
}
