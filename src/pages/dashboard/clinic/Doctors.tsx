import { Input } from "@/components/ui/input";
import { useNavbarContext } from "@/context/NavbarContext";
import { PhoneIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import AddNewDoctor from "@/components/dashboard/AddNewDoctor";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const Doctors = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("Doctors");
    setBreadcrumb(undefined);
    setActiveItem("Doctors");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return (
    <div className="size-full overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7 ">
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1 relative h-fit  w-full max-w-[23rem]">
          <span className="absolute inset-y-0 my-auto ml-3 size-4">
            <Search className="!size-full" />
          </span>
          <Input
            type="text"
            placeholder="Name, Department"
            className="!h-10  rounded-sm pl-8 focus-visible:border-black !ring-0 !bg-transparent"
          />
        </div>
        <AddNewDoctor />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-x-5 gap-y-7">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="group w-full max-w-80 h-65 shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 cursor-pointer"
          >
            <div className="relative bg-muted h-24">
              <figure className="absolute inset-0 mx-auto top-2/5 border border-gray-500 bg-white size-22 rounded-full overflow-hidden pt-4">
                <img src="/user-profile.png" alt="" className="opacity-90" />
              </figure>
            </div>
            <div className="flex flex-col items-center mt-10 gap-1">
              <Link
                to="doctor_123"
                className="font-medium  hover:text-primary hover:underline"
              >
                Dr.John Doe
              </Link>
              <p className="text-sm text-muted-foreground/90">
                General Practitioner
              </p>
              <div className="flex items-center gap-1 text-[.85rem]">
                <PhoneIcon className="size-[.8rem]" />
                <Link
                  to={`tel:+250790883242`}
                  target="_blank"
                  className="hover:underline hover:text-primary"
                >
                  +250790883242
                </Link>
              </div>
              <div className="flex items-center text-[.85rem]">
                {index % 2 === 0 ? (
                  <div className="flex items-center gap-1 ">
                    <span className="block rounded-full size-2.5 bg-green-500"></span>
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[.85rem]">
                    <span className="block rounded-full size-2.5 bg-red-500"></span>
                    <span>Unavailable</span>
                  </div>
                )}
                <span>&nbsp;-&nbsp;Today</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
