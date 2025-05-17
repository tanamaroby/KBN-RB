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
import { useUser } from "@/stores/user-store";
import { users } from "../../generated/prisma";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: users;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { user } = props;
  const { updateUser } = useUser();

  React.useEffect(() => {
    updateUser(user);
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <KebunSwitcher kebuns={KEBUN_LIST} />
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
