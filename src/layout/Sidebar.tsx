import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
function SidebarContent({ children }: { children: React.ReactNode }) {


  return (
    <>
        <AppSidebar />
      {children}
    </>
  );
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarContent>{children}</SidebarContent>
    </SidebarProvider>
  );
}
