import AppointmentsTable from "@/components/dashboard/AppointmentsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavbarContext } from "@/context/NavbarContext";
import {
  CalendarDays,
  ChevronDownIcon,
  Folder,
  Plus,
  Search,
} from "lucide-react";
import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useAppointmentDialogContext } from "@/context/AppointmentDialogContext";
import { useSidebar } from "@/components/ui/sidebar";

const Appointments = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();

  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setBreadcrumb(undefined);
    setActiveItem("Appointments");
    setDashTitle("Appointments");
  }, [setBreadcrumb, setActiveItem, setDashTitle]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 769px)" });
  const [isBulkSelection, setIsBulkSelection] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { setIsOpen, setDialogType } = useAppointmentDialogContext();

  return (
    <div className="size-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col-reverse md:flex-row gap-y-4 gap-x-6 justify-between">
        <div className="flex flex-wrap items-center gap-4  md:flex-1 ">
          <div className="flex-1 relative h-fit min-w-full xs:min-w-[20rem] xl:max-w-[23rem]">
            <span className="absolute inset-y-0 my-auto ml-3 size-4">
              <Search className="!size-full" />
            </span>
            <Input
              type="text"
              placeholder="Search by patient, doctor, department…"
              className="!h-10  rounded-sm border-black pl-8 focus-visible:border-black !ring-0 !bg-transparent"
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                id="date"
                className="justify-start font-normal !px-0 !bg-transparent"
              >
                <CalendarDays className="stroke-[1.3] size-5" />
                {date ? format(date, "EE, MMM dd, yyyy") : "Select date"}
                <ChevronDownIcon className="ml-6 !size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex ml-auto gap-x-3 lg:gap-x-4">
          <Button variant={"ghost"} className="text-primary h-10">
            Create New
            <span>
              <Plus />
            </span>
          </Button>
          <Button className="h-10 ">
            <span>
              <Folder />
            </span>
            Export Report
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-y-2 gap-x-8">
          <div className="flex items-center text-sm gap-1 text-muted-foreground/95">
            <span>Show:</span>
            <Input
              type="number"
              defaultValue={10}
              max={30}
              min={5}
              step={5}
              className="!h-5 !px-2 w-14"
            />
            <span>Entries</span>
          </div>
          <div className="flex gap-x-5">
            {date && (
              <Button
                variant={"ghost"}
                onClick={() => setDate(undefined)}
                className="font-light h-fit !p-0 !bg-transparent !text-primary !text-[.9rem] hover:underline cursor-pointer"
              >
                Clear all filters
              </Button>
            )}
            {isBulkSelection && (
              <Button
                variant={"ghost"}
                onClick={() => {
                  setDialogType("bulk-cancellation");
                  setIsOpen(true);
                }}
                className="font-light h-fit !p-0 !bg-transparent !text-primary !text-[.9rem] hover:underline cursor-pointer"
              >
                Cancel Appointments
              </Button>
            )}
          </div>
        </div>

        <AppointmentsTable setIsBulkSelection={setIsBulkSelection} />
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

export default Appointments;
