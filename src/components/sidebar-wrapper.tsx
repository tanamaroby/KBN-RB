import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

interface SidebarWrapperProps extends React.PropsWithChildren {}

const SidebarWrapper: React.FC<SidebarWrapperProps> = (props) => {
  const { children } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
