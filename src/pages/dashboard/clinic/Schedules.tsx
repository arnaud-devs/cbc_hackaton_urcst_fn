import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavbarContext } from "@/context/NavbarContext";
import ScheduleCalendar from "@/components/Appointment/ScheduleCalendar";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import NewScheduleDrawerContent from "@/components/dashboard/NewScheduleDrawerContent";
import { useEffect, useState } from "react";
import SlotDrawerContent from "@/components/dashboard/SlotDrawerContent";
import { useSidebar } from "@/components/ui/sidebar";

const Schedules = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setBreadcrumb(undefined);
    setActiveItem("Schedules");
    setDashTitle("Schedules");
  }, [setBreadcrumb, setActiveItem, setDashTitle]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scheduleDrawer, setScheduleDrawer] = useState<
    | {
        mode: "new" | "viewer";
        slot?: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    console.log("innn", isDrawerOpen, scheduleDrawer);
    if (scheduleDrawer && !isDrawerOpen) {
      setIsDrawerOpen(true);
    }
  }, [isDrawerOpen, scheduleDrawer]);

  return (
    <div className="size-full overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7 ">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm">Service Name</p>
          <Select defaultValue="0">
            <SelectTrigger className="min-w-55 !h-10">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All</SelectItem>
              <SelectItem value="1">Service 1</SelectItem>
              <SelectItem value="2">Service 2</SelectItem>
              <SelectItem value="3">Service 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Drawer
          direction="right"
          open={isDrawerOpen}
          onOpenChange={(open) => {
            if (!open) setScheduleDrawer(undefined);
            setIsDrawerOpen(open);
          }}
        >
          <DrawerTrigger asChild>
            <Button
              onClick={() => setScheduleDrawer({ mode: "new" })}
              className="!h-10 !px-5"
            >
              Add Schedule
              <Plus size={20} />
            </Button>
          </DrawerTrigger>
          {scheduleDrawer && scheduleDrawer.mode === "new" && (
            <NewScheduleDrawerContent />
          )}
          {scheduleDrawer && scheduleDrawer.mode === "viewer" && (
            <SlotDrawerContent />
          )}
        </Drawer>
      </div>
      <div className="border border-input/40 rounded-sm text-[.8rem] !m-0">
        <ScheduleCalendar setScheduleDrawer={setScheduleDrawer} />
      </div>
    </div>
  );
};

export default Schedules;
