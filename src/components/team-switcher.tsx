"use client";

import { ChevronsUpDown, FileQuestion, TreePalm } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePlantation } from "@/stores/plantation-store";
import { first } from "lodash";

export function KebunSwitcher() {
  const { isMobile } = useSidebar();

  const { plantations, plantation, updatePlantation } = usePlantation();

  const selectedPlantation = React.useMemo(() => {
    if (plantation) return plantation;
    return first(plantations);
  }, [plantation, plantations]);

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
                {selectedPlantation ? (
                  <TreePalm className="size-4" />
                ) : (
                  <FileQuestion className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {selectedPlantation
                    ? selectedPlantation.name
                    : "No kebun selected"}
                </span>
                <span className="truncate text-xs">
                  {/* {activeTeam.description} */}
                  {selectedPlantation
                    ? `${selectedPlantation.code} - ${selectedPlantation.areaTotalHa}`
                    : "Pilih kebun untuk mulai"}
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
            {/* {kebuns.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
