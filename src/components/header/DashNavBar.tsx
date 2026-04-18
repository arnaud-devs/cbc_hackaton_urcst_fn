import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import NavBarProfile from "./NavBarProfile";
import { useNavbarContext } from "@/context/NavbarContext";
import { useEffect, useState } from "react";

const DashNavBar = () => {
  const { dashTitle } = useNavbarContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${
        scrolled ? "shadow-xl" : "shadow-none"
      } duration-300 px-3 sm:px-7 xl:pr-8 fixed w-full z-10 bg-[var(--dashboard-background)] shadow2xl lg:group-data-[collapsible=icon]/sidebar-wrapper:pl-[calc(var(--sidebar-width-icon)+2rem)] lg:pl-[calc(var(--sidebar-width)+2rem)] h-14 sm:h-16 max-w-[90rem] top-0 flex-1 flex gap-x-2 items-center`}
    >
      <SidebarTrigger />
      <p className="font-medium lg:text-lg text-primary text-nowrap">
        {dashTitle}
      </p>
      <div className="flex  gap-x-8  lg:gap-x-10 items-center ml-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="!p-0 !bg-transparent size-6 ">
              <Bell
                strokeWidth={1.8}
                className="text-black hover:text-primary !size-full"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 min-h-48 flex flex-col gap-y-2">
            <h4 className="leading-none font-medium">Notifications</h4>
            <div className=" flex flex-col justify-center text-[.9rem] flex-1  size-full">
              <p className="text-center">
                No alerts right now — enjoy your day!
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <NavBarProfile />
      </div>
    </div>
  );
};

export default DashNavBar;
