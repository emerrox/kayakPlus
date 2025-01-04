import { Home, LogOut, Settings, Users, UserRoundPen } from "lucide-react";
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
// import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import useIsLogged from "@/contexts/useIsLogged";
import { useNavigate } from "react-router-dom";
import useGroups from "@/integration/useGroups";
import { useEffect, useState } from "react";
import { Groups } from "@/types";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/home",
    icon: Home,
  },
  {
    title: "Perfil",
    url: "#",
    icon: UserRoundPen,
  },
  {
    title: "Ajustes",
    url: "#",
    icon: Settings,
  },
  // {
  //   title: "Grupos",
  //   url: "#",
  //   icon: Users,
  // },
];

export function AppSidebar() {
  const { open, toggleSidebar, isMobile, openMobile } = useSidebar();
  const {email,name,pictureUrl}=useIsLogged();
  const navigate = useNavigate();
  const {getGroups} = useGroups();
  // let groups:Groups|undefined;
  const [groups, setGroups] = useState<Groups[]|undefined>(undefined);
  useEffect(() => {
    async function fetchGroups() {
      const groupsData = await getGroups();
      setGroups(groupsData);
    }
    fetchGroups();
  }, []);

  return (
    <>
      {isMobile ?(
        <>
<button
  className="fixed top-4 left-4 p-2 max-h-9 bg-slate-900 text-white rounded-full z-50"
  onClick={() => toggleSidebar()}
>
  ☰
</button>
<div
  className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${
    openMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
>
                <Sidebar collapsible="icon" >
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <span onClick={()=> navigate(item.url)}>
                                <item.icon />
                                <span>{item.title}</span>
                              </span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="border-t border-border p-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 rounded-full">
                        <AvatarImage src={pictureUrl} className="h-9 w-9 rounded-full" />
                      </Avatar>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Cerrar sesión</span>
                    </Button>
                  </div>
                </SidebarFooter>
                </Sidebar>
              </div>
          
        </>
      ) : (
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>KayakPlus</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <span onClick={()=> navigate(item.url)}>
                          <item.icon />
                          <span>{item.title}</span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem key={"Grupos"}>
                    <SidebarMenuButton asChild >
                      <span onClick={()=> navigate("/groups")}>
                      <Users/>
                          <span>{"Grupos"}</span>
                        </span>
                    </SidebarMenuButton>
                    
                    < SidebarMenuSub>

                      {groups?.map((group) => (
                        <SidebarMenuSubItem key={group.id}>
                          <SidebarMenuSubButton asChild>
                            <span onClick={()=> navigate(`/groups/${group.id}`)}>
                              <span>{group.name}</span>
                            </span>
                          </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      ))}
                    </ SidebarMenuSub>

                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <button
            className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full"
            onClick={toggleSidebar}
          >
            {open ? '←' : '→'}
          </button>
          </SidebarContent>
          { open &&       <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage src={pictureUrl} className="h-9 w-9 rounded-full" />
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </div>

      </SidebarFooter>}
        </Sidebar>
      )}
    </>
  );
}