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
import { KEBUN_LIST } from "@/lib/constants/kebun";
import { NAV_ITEMS } from "@/lib/constants/nav";
import { USER } from "@/lib/constants/user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <KebunSwitcher kebuns={KEBUN_LIST} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={USER} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
