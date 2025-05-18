import { getAllPlantations, getFirstUser } from "@/app/actions";
import { EMPTY_USER } from "@/stores/user-store";
import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

interface SidebarWrapperProps extends React.PropsWithChildren {}

const SidebarWrapper: React.FC<SidebarWrapperProps> = async (props) => {
  const { children } = props;
  const user = await getFirstUser();
  const plantations = await getAllPlantations();
  return (
    <SidebarProvider>
      <AppSidebar user={user ?? EMPTY_USER} plantations={plantations} />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
