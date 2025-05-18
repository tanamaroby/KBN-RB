"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { KebunSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from "@/lib/constants/nav";
import { usePlantation } from "@/stores/plantation-store";
import { useUser } from "@/stores/user-store";
import { Plantation, users } from "../../generated/prisma";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: users;
  plantations: Array<Plantation>;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { user, plantations } = props;
  const { updateUser } = useUser();
  const { setPlantations } = usePlantation();

  React.useEffect(() => {
    updateUser(user);
    if (plantations) {
      setPlantations(plantations);
    }
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <KebunSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
