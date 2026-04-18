import AppointmentsTable from "@/components/dashboard/AppointmentsTable";
import DoctorAvailability from "@/components/dashboard/DoctorAvailability";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavbarContext } from "@/context/NavbarContext";
import { Mail, PhoneIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Doctor = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("Doctors");
    setBreadcrumb({
      links: [{ label: "Doctors", href: "Doctors" }],
      page: "Dr. John Doe",
    });
    setActiveItem("Doctors");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return (
    <div className="size-full space-y-4 md:space-y-5">
      <div className="md:max-h-80 xl:max-h-63 grid grid-cols-1 md:grid-cols-[14rem_auto] grid-rows-[auto_auto] md:grid-rows-1 flex-col md:flex-row gap-y-12 md:gap-x-5 max-md:bg-background rounded-md outline-hidden">
        <div className="col-start-1 row-start-1 relative bg-muted md:bg-background  h-35 sm:h-45 md:h-full md:shadow-lg md:rounded-md">
          <figure className="max-md:border border-muted max-md:absolute inset-0 mx-auto top-1/2 size-30 sm:size-35 max-md:bg-background pt-4 max-md:rounded-full md:w-55 md:h-full  overflow-hidden">
            <img
              src="/user-profile.png"
              alt=""
              className="opacity-60 size-full  md:object-cover md:mt-10"
            />
          </figure>
        </div>
        <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 flex-1 flex flex-wrap xl:flex-nowrap justify-between gap-5  md:bg-background rounded-md shadow-lg p-4 sm:p-5 md:p-7">
          <div className="space-y-3">
            <h2 className="text-xl max-sm:leading-6 sm:text-2xl md:text-[1.7rem] font-semibold text-muted-foreground">
              Dr. John Doe
            </h2>
            <p className="font-medium text-gray-500">Cardiologist</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[.95rem]">
                <Mail className="size-4" />
                <Link
                  to={`mailto:+example@gmail.com`}
                  target="_blank"
                  className="hover:underline hover:text-primary"
                >
                  example@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2 text-[.95rem]">
                <PhoneIcon className="size-4" />
                <Link
                  to={`tel:+250790883242`}
                  target="_blank"
                  className="hover:underline hover:text-primary"
                >
                  +250790883242
                </Link>
              </div>
              <div className="flex items-center text-[.85rem]">
                <div className="flex items-center gap-1 ">
                  <span className="block rounded-full size-2.5 bg-green-500"></span>
                  <span>Available</span>
                </div>
                <span>&nbsp;-&nbsp;Today</span>
              </div>
            </div>
          </div>
          <DoctorAvailability className="justify-self-end h-fit" />
        </div>
      </div>
      <div className=" overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7 ">
        <h3 className="font-medium ">Upcoming Appointments</h3>
        <div className="overflow-x-auto">
          <AppointmentsTable showRecent />
        </div>
      </div>
    </div>
  );
};

export default Doctor;
