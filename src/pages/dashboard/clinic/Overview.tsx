import { useNavbarContext } from "@/context/NavbarContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SlotsCalendarMaker from "@/components/dashboard/SlotsCalendarMaker";
import { addDays } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppointmentDialogContext } from "@/context/AppointmentDialogContext";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const Overview = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setBreadcrumb(undefined);
    setActiveItem("Overview");
    setDashTitle("Good Morning, Doctor");
  }, [setBreadcrumb, setActiveItem, setDashTitle]);

  const { setIsOpen } = useAppointmentDialogContext();

  return (
    <div className="flex-1 flex h-fit border- flex-col gap-2 sm:gap-3 md:gap-4">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="flex flex-col min-w-[14rem] bg-white flex-1 h-44 lg:h-48 rounded-md shadow-xl/5">
          <Link
            to="/doctor/appointments"
            className="cursor-pointer hover:text-primary group flex  items-center gap-2 border-b mx-2 h-14 xl:h-16 px-6"
          >
            <div className="bg-yellow-500/20 size-7 p-1 rounded-sm">
              <CalendarCheck
                strokeWidth={1.5}
                className="text-yellow-600
                00 !size-full"
              />
            </div>
            <h3 className="font-medium group-hover:underline">Appointments</h3>
            <FaArrowRight className="group-hover:animate-bounce-x ml-auto" />
          </Link>
          <div className=" pl-15  my-auto lg:space-y-1 ">
            <div>
              <p className="font-medium text-4xl lg:text-5xl">50</p>
              <p className="text-[.9rem] text-muted-foreground/90">
                Pending Appointment
              </p>
            </div>
            <div className="bg-green-500/20 rounded w-fit px-2">
              <span className="text-[.8rem] text-green-600 font-medium">
                15 Today
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-[14rem] bg-white flex-1 h-44 lg:h-48 rounded-md shadow-xl/5">
          <Link
            to="/doctor/patients"
            className="cursor-pointer hover:text-primary group flex items-center gap-2 border-b mx-2 h-14 xl:h-16 px-6"
          >
            <div className="bg-purple-700/15 size-7 p-1 rounded-sm">
              <Icon
                icon="mynaui:users-group"
                className="text-purple-700 !size-full"
              />
            </div>
            <h3 className="group-hover:underline font-medium">My Patients</h3>
            <FaArrowRight className="group-hover:animate-bounce-x ml-auto" />
          </Link>
          <div className=" pl-15  my-auto lg:space-y-1">
            <div>
              <p className="font-medium text-4xl lg:text-5xl">50</p>
              <p className="text-[.9rem] text-muted-foreground/90">
                Total Patients
              </p>
            </div>
            <div className="bg-green-500/20 rounded w-fit px-2">
              <span className="text-[.8rem] text-green-600 font-medium">
                15 Today
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-[14rem] bg-white flex-1 h-44 lg:h-48 rounded-md shadow-xl/5">
          <Link
            to="#"
            className="cursor-pointer hover:text-primary group flex items-center gap-2 border-b mx-2 h-14 xl:h-16 px-6"
          >
            <div className="bg-primary/15 size-7 p-1 rounded-sm">
              <Icon
                icon="stash:plan-light"
                className="text-primary !size-full"
              />
            </div>
            <h3 className="group-hover:underline font-medium leading-4">
              Subscription
            </h3>
            <FaArrowRight className="group-hover:animate-bounce-x ml-auto" />
          </Link>
          <div className=" pl-15  my-auto ">
            <p className="text-3xl text-primary font-semibold">Active</p>
            <p className="text-[.9rem] text-muted-foreground/90">
              3 Days Remaining
            </p>
          </div>
        </div>
      </div>
      <div className="group/upcoming w-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-8">
        <h3 className="font-medium ">Upcoming Appointments</h3>
        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
            }}
            className="group"
          >
            <CarouselContent className="">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[80%] sm:basis-[60%] md:basis-[45%] xl:basis-[35%]  "
                >
                  <div
                    onClick={() => setIsOpen(true)}
                    className="bg-primary cursor-pointer text-white p-5 rounded-md  w-full"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-xl text-green-300">
                        John Doe
                      </p>
                      <div className="">
                        <span className="text-sm font-medium">9:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="hugeicons:doctor-01" width="16" height="16" />
                      <p className="text-[.93rem]">Dr. John Doe</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem className="flex items-center justify-center basis-[45%] sm:basis-1/5">
                <div
                  className="w-20 flex items-center hover:underline justify-center gap-1 cursor-pointer "
                  onClick={() => {
                    // navigate("/health");
                  }}
                >
                  <span className="text-xs tracking-tight md:text-sm">
                    View All
                  </span>
                  <figure className="size-4 ">
                    <ArrowRight className="size-full" />
                  </figure>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden group-hover/upcoming:lg:inline-flex size-10 bg-primary/90 hover:bg-primary/85 border-2 border-white text-white -left-3 sm:-left-5 disabled:!hidden" />
            <CarouselNext className="hidden group-hover/upcoming:lg:inline-flex size-10 bg-primary/90 hover:bg-primary/85 border-2 border-white text-white -right-3 sm:-right-5 disabled:!hidden" />
          </Carousel>
        </div>
      </div>
      <div className=" flex  flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between gap-2 sm:gap-3 md:gap-4 ">
        <div className="w-full overflow-hidden md:flex-1 lg:flex-3/5 lg:w-full space-y-6 bg-background rounded-md shadow-xl/5 p-8">
          <div className="flex items-center justify-between">
            <h3 className="font-medium ">Recent Appointments</h3>
            <Link
              to="/doctor/appointments"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <AppointmentsTable showRecent />
          </div>
        </div>
        <div className="flex-1 lg:flex-2/5 space-y-7 bg-background rounded-md shadow-xl/5 p-8">
          <h3 className="font-medium ">Slot Availability</h3>
          <SlotsCalendarMaker
            ranges={[
              {
                startDate: new Date("2025-08-5"),
                endDate: addDays(new Date("2025-08-5"), 7),
                type: "available",
              },
              {
                startDate: addDays(new Date("2025-08-5"), 8),
                endDate: addDays(new Date(), 30),
                type: "fully-reserved",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
