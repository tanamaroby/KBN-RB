import PlantationComponent from "@/components/plantations/PlantationComponent";
import SidebarWrapper from "@/components/sidebar-wrapper";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Plantations() {
  return (
    <SidebarWrapper>
      <div className="flex justify-between items-center">
        <Title>Plantations</Title>
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
