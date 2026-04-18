import { useEffect, useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Folder, CalendarDays, ChevronDownIcon } from "lucide-react";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "react-responsive";

const AdminBookings = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 769px)" });

  useEffect(() => {
    setDashTitle("Bookings");
    setBreadcrumb(undefined);
    setActiveItem("Bookings");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return (
    <div className="size-full overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col-reverse md:flex-row gap-y-4 gap-x-6 justify-between">
        <div className="flex flex-wrap items-center gap-4 md:flex-1">
          <div className="flex-1 relative h-fit min-w-full xs:min-w-[20rem] xl:max-w-[23rem]">
            <Search className="absolute inset-y-0 my-auto left-3 size-4" />
            <Input
              placeholder="Search by patient, doctor, service…"
              className="!h-10 rounded-sm pl-8 focus-visible:border-black !ring-0 !bg-transparent"
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="justify-start font-normal !px-0 !bg-transparent">
                <CalendarDays className="stroke-[1.3] size-5" />
                {date ? format(date, "EE, MMM dd, yyyy") : "Select date"}
                <ChevronDownIcon className="ml-6 !size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(d) => { setDate(d); setOpen(false); }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex ml-auto gap-x-3">
          <Button className="h-10">
            <Folder />Export Report
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {date && (
          <Button
            variant="ghost"
            onClick={() => setDate(undefined)}
            className="font-light h-fit !p-0 !bg-transparent !text-primary !text-[.9rem] hover:underline"
          >
            Clear filter
          </Button>
        )}
        <AppointmentsTable />
        <Pagination
          size={isTabletOrMobile ? "small" : "medium"}
          count={10}
          variant="outlined"
          shape="rounded"
          className="ml-auto w-fit"
        />
      </div>
    </div>
  );
};

export default AdminBookings;
