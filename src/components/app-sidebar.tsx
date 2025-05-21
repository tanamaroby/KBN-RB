"use client";

import * as React from "react";

import { setUserSelectedPlantation } from "@/app/plantations/actions";
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
import { find, first, isNull } from "lodash";
import { Plantation, users } from "../../generated/prisma";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: users;
  plantations: Array<Plantation>;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { user, plantations } = props;
  const { updateUser, setLoading: setUserLoading } = useUser();
  const {
    setPlantation,
    setPlantations,
    setLoading: setPlantationLoading,
  } = usePlantation();

  React.useEffect(() => {
    /* ---------------------------- DEFINED FUNCTIONS --------------------------- */
    const updateUserSelectedPlantationId = async (
      id: string | null,
      email: string
    ) => {
      if (isNull(id)) return;
      try {
        await setUserSelectedPlantation(id, email);
      } catch (e) {
        console.error(e);
      }
    };

    /* ------------------------------- UPDATE USER ------------------------------ */
    // Update user selected plantation if none
    let newUser = user;

    if (!user.selectedPlantationId) {
      newUser = {
        ...newUser,
        selectedPlantationId: first(plantations)?.id ?? null,
      };
      if (newUser.selectedPlantationId) {
        updateUserSelectedPlantationId(
          newUser.selectedPlantationId,
          newUser.email
        );
      }
    }

    // Update local storage of users
    updateUser(newUser);

    if (plantations) {
      setPlantations(plantations);
      setPlantation(
        find(
          plantations,
          (plantation) => plantation.id === newUser.selectedPlantationId
        ) ?? null
      );
    }

    setUserLoading(false);
    setPlantationLoading(false);
  }, [user, plantations]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <KebunSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
