import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import useIsLogged from "@/contexts/useIsLogged";
function SidebarContent({ children }: { children: React.ReactNode }) {
const {token} = useIsLogged();

  return (
    <>
      {token && <AppSidebar />}
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
