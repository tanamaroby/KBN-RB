"use client";

import { ChevronsUpDown, Palmtree, Plus, TreePalm } from "lucide-react";

import { setUserSelectedPlantation } from "@/app/plantations/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePlantation } from "@/stores/plantation-store";
import { useUser } from "@/stores/user-store";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plantation } from "../../generated/prisma";
import { Skeleton } from "./ui/skeleton";

export function KebunSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const { email, selectedPlantationId, updateSelectedPlantationId } = useUser();
  const { plantations, plantation, setPlantation, loading } = usePlantation();

  const onSelectedPlantation = async (plantation: Plantation) => {
    try {
      if (selectedPlantationId !== plantation.id) {
        await toast.promise(setUserSelectedPlantation(plantation.id, email), {
          loading: "Sedang di process...",
          success: "Berhasil merubah kebun pilihan user!",
          error: "Gagal merubah kebun pilihan user!",
        });
        updateSelectedPlantationId(plantation.id);
        setPlantation(plantation);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center p-[8px] gap-2">
        <Skeleton className="size-4 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (isEmpty(plantations) || !plantation) {
    return (
      <SidebarMenu>
        <SidebarMenuItem className="text-muted-foreground">
          <Link href={"/plantations/new"}>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg border border-muted-foreground border-dashed">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Belum ada kebun</span>
                <span className="truncate text-xs">
                  Click untuk tambah kebun
                </span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <TreePalm className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{plantation.name}</span>
                <span className="truncate text-xs">
                  {plantation.code} - {plantation.areaTotalHa} Ha
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              List Kebun
            </DropdownMenuLabel>
            {plantations.map((plantation, i) => {
              return (
                <DropdownMenuItem
                  key={plantation.id}
                  onClick={() => onSelectedPlantation(plantation)}
                  className={cn(
                    "gap-2 p-2",
                    selectedPlantationId === plantation.id && "bg-accent"
                  )}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Palmtree className="size-3.5 shrink-0" />
                  </div>
                  <p>{plantation.name}</p>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <Link href="/plantations/new">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <p className="font-medium text-muted-foreground">
                  Tambah kebun
                </p>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
