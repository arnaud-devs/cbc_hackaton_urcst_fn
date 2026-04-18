import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  CalendarCheck,
  CalendarDays,
  Hospital,
  LayoutDashboard,
  MessageCircleQuestionMark,
  Search,
  Settings,
  type LucideProps,
} from "lucide-react";
import React, { type ElementType } from "react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

// Menu items.
export type ItemsTitle =
  | "Overview"
  | "Appointments"
  | "Schedules"
  | "Doctors"
  | "Public Profile"
  | "Help Center"
  | "Settings";

const items: {
  title: ItemsTitle;
  url: string;
  section: string;
  icon: unknown;
}[] = [
  {
    title: "Overview",
    url: "overview",
    section: "content",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "appointments",
    section: "content",
    icon: CalendarCheck,
  },
  {
    title: "Schedules",
    url: "schedules",
    section: "content",
    icon: CalendarDays,
  },
  {
    title: "Doctors",
    url: "doctors",
    section: "content",
    icon: <Icon icon="hugeicons:doctor-01" width="24" height="24" />,
  },
  {
    title: "Public Profile",
    url: "public",
    section: "content",
    icon: Hospital,
  },
  {
    title: "Help Center",
    url: "#",
    section: "footer",
    icon: MessageCircleQuestionMark,
  },
  {
    title: "Settings",
    url: "#",
    section: "footer",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { open, toggleSidebar, activeItem } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-8 mb-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/clinic/overview"
              className="flex items-center gap-2 h-[2.8rem]  font-medium overflow-hidden"
            >
              <div className="">
                <figure className="w-f group-data-[collapsible=icon]:w-[2rem] w-[2.8rem] duration-200">
                  <img
                    src="/logo-light.png"
                    className="size-full"
                    alt="Huza-Care-Logo"
                  />
                </figure>
              </div>
              <span className="group-data-[collapsible=icon]:text-xs text-2xl sm:text-lg md:text-[1.1rem] duration-200">
                HuzaCare
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-y-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem className="list-none">
              <SidebarMenuButton className="relative !bg-transparent h-fit rounded-none  p-0 ">
                <span
                  className={`${
                    !open
                      ? "relative cursor-pointer size-5 text-sidebar-foreground/80"
                      : "absolute inset-y-0 my-auto ml-3 size-4 text-sidebar-foreground/60"
                  } block`}
                  onClick={() => !open && toggleSidebar()}
                >
                  <Search className="!size-full" />
                </span>
                {open && (
                  <Input
                    type="text"
                    placeholder="Search…"
                    className="!h-10 selection:bg-sidebar-foreground selection:text-sidebar rounded-sm border-sidebar-foreground/60 pl-8 focus-visible:border-sidebar-foreground focus-visible:text-white !ring-0 !bg-transparent placeholder:text-sidebar-foreground/60"
                  />
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  item.section === "content" && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={activeItem === item.title}
                        asChild
                      >
                        <Link to={item.url}>
                          {React.isValidElement(item.icon)
                            ? item.icon
                            : React.createElement(
                                item.icon as ElementType<LucideProps>,
                                {
                                  className: "w-5 h-5",
                                }
                              )}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>SUPPORT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  item.section === "footer" && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          {React.isValidElement(item.icon)
                            ? item.icon
                            : React.createElement(
                                item.icon as ElementType<LucideProps>,
                                {
                                  className: "w-5 h-5",
                                }
                              )}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
