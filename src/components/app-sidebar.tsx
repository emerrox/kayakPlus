import {
  Home,
  LogOut,
  Settings,
  Users,
  UserRoundPen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import useIsLogged from "@/contexts/useIsLogged";
import { useNavigate } from "react-router-dom";
import useGroups from "@/integration/useGroups";
import { useEffect, useState } from "react";
import { Groups } from "@/types";
import { Drawer } from "vaul";
import {
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { googleLogout } from "@react-oauth/google";

const navigationItems = [
  { title: "Inicio", url: "/home", icon: Home },
  { title: "Perfil", url: "#", icon: UserRoundPen },
  { title: "Ajustes", url: "#", icon: Settings },
];

export function AppSidebar({  setLogoutTrigger }: { setLogoutTrigger: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const { open, toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar();
  const { email, name, pictureUrl } = useIsLogged();
  const { getGroups } = useGroups();
  const [groups, setGroups] = useState<Groups[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const groupsData = await getGroups();
      setGroups(groupsData);
    })();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    googleLogout();
    setGroups(undefined);
    setLogoutTrigger(prev => !prev);
    navigate("/");
  };

  const renderNavigationItems = () =>
    navigationItems.map((item) => (
      <li key={item.title}>
        <button
          onClick={() => navigate(item.url)}
          className="flex items-center space-x-2 w-full text-left p-2 rounded-md hover:bg-gray-100"
        >
          <item.icon />
          <span>{item.title}</span>
        </button>
      </li>
    ));

  const renderGroupItems = () =>
    groups?.map((group) => (
      <li key={group.id}>
        <button
          onClick={() => {
            navigate(`/group/?id=${group.id}`)
            setOpenMobile(false)
          }}
          className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100"
        >
          <span>{group.name}</span>
        </button>
      </li>
    ));

  const renderDrawerContent = () => (
    <DrawerContent className="p-0 bg-white">
      <div className="sr-only">
        <DrawerTitle>Menú de Navegación</DrawerTitle>
        <DrawerDescription>Usa este menú para navegar por las secciones de la aplicación.</DrawerDescription>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-4">Application</h2>
          <ul className="space-y-2">
            {renderNavigationItems()}
            <li>
              <button
                onClick={() => navigate("/groups")}
                className="flex items-center space-x-2 w-full text-left p-2 rounded-md hover:bg-gray-100"
              >
                <Users />
                <span>Grupos</span>
              </button>
              <ul className="ml-4 mt-2 space-y-1">{renderGroupItems()}</ul>
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Avatar className="h-9 w-9 rounded-full">
                  <AvatarImage src={pictureUrl} className="h-9 w-9 rounded-full"  />

                  <AvatarFallback className="rounded-full"></AvatarFallback>
                </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </div>
    </DrawerContent>
  );

  const renderSidebarContent = () => (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>KayakPlus</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span onClick={() => navigate(item.url)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem key="Grupos">
              <SidebarMenuButton asChild>
                <span onClick={() => navigate("/groups")}>  
                  <Users />
                  <span>Grupos</span>
                </span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {groups?.map((group) => (
                  <SidebarMenuSubItem key={group.id}>
                    <SidebarMenuSubButton asChild>
                      <span onClick={() => navigate(`/group/?id=${group.id}`)}>
                        <span>{group.name}</span>
                      </span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <button
        className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full"
        onClick={toggleSidebar}
      >
        {open ? "←" : "→"}
      </button>
    </SidebarContent>
  );

  const renderSidebarFooter = () => (
    <SidebarFooter
      className={`border-t border-border mt-auto transition-all ${open ? "p-4" : "pl-2"}`}
    >
      <div className={`flex items-center justify-${open ? "between" : "center"}`}>
        <div className="flex items-center">
          <Avatar
            className={`transition-all rounded-full ${open ? "h-9 w-9" : "h-6 w-6"}`}
          >
            <AvatarImage src={pictureUrl} className="rounded-full" />
            <AvatarFallback className="rounded-full"></AvatarFallback>
          </Avatar>
          {open && (
            <div className="ml-2">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          )}
        </div>
        {open && (
          <Button
            variant="ghost"
            size="icon"
            className="transition-all transform hover:scale-110 duration-300"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        )}
      </div>
    </SidebarFooter>
  );

  return (
    <>
      {isMobile ? (
        <Drawer.Root open={openMobile} onOpenChange={toggleSidebar}>
          <DrawerTrigger asChild>
            <Button className="fixed top-4 left-4 p-2 max-h-9 bg-slate-900 text-white rounded-full z-50">
              ☰
            </Button>
          </DrawerTrigger>
          {renderDrawerContent()}
          </Drawer.Root>
      ) : (
        <Sidebar collapsible="icon">
          {renderSidebarContent()}
          {renderSidebarFooter()}
        </Sidebar>
      )}
    </>
  );
}
