import type { NavbarItem } from "@/components/header/NavItems";
import React, { useContext, useState, type ReactNode } from "react";

interface NavbarContextType {
  activeItem: NavbarItem;
  setActiveItem: (item: NavbarItem) => void;
  dashTitle: string;
  setDashTitle: (title: string) => void;
  breadcrumb:
    | {
        links?: Array<BreadcrumbLinkType>;
        page: string;
      }
    | undefined;
  setBreadcrumb: (
    params:
      | {
          links?: Array<BreadcrumbLinkType>;
          page: string;
        }
      | undefined
  ) => void;
}

type BreadcrumbLinkType = { label: string; href: string };

const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined
);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [activeItem, setActiveItem] = useState<NavbarItem>("Home");
  const [dashTitle, setDashTitle] = useState<string>("");
  const [breadcrumb, setBreadcrumb] = useState<
    | {
        links?: Array<BreadcrumbLinkType>;
        page: string;
      }
    | undefined
  >();

  return (
    <NavbarContext.Provider
      value={{
        activeItem,
        setActiveItem,
        dashTitle,
        setDashTitle,
        breadcrumb,
        setBreadcrumb,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = (): NavbarContextType => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};
