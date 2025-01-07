import { useEffect, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import useIsLogged from "@/contexts/useIsLogged";


export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { token } = useIsLogged();
  const [logoutTrigger, setLogoutTrigger] = useState(false);
  useEffect(() => {
    if (token) {
      setLogoutTrigger(false);
    }
  }, [token]);

  return (
    <SidebarProvider defaultOpen={false}>
      {token && !logoutTrigger && <AppSidebar setLogoutTrigger={setLogoutTrigger} />}
      {children}
    </SidebarProvider>
  );
}