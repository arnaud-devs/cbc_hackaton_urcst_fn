import { ClinicInfoCard } from "@/components/clinic/ClinicInfoCard";
import ClinicSearch from "@/components/clinic/ClinicSearch";
import { useNavbarContext } from "@/context/NavbarContext";
import { ListFilter } from "lucide-react";
import heroBackgroundLines from "@/assets/hero_background_lines.png";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Clinics = () => {
  const { setActiveItem } = useNavbarContext();
  setActiveItem("Clinics");
  useDocumentTitle("Clinics");

  return (
    <div className="relative mt-10 mb-20 space-y-8 mx-[5%]  ">
      <div className="relative flex flex-col gap-y-3 sm:gap-y-6 lg:gap-y-8 justify-center items-center bg-primary text-white px-5 pt-14 pb-8 sm:pt-20 sm:pb-12 rounded-xl overflow-hidden ">
        <figure className="absolute -top-[60%] -left-10 w-[105%] h-[120%] bg-amber -rotate-[5deg] brightness-120 z-0">
          <img
            src={heroBackgroundLines}
            alt="background_lines"
            className=" size-full"
          />
        </figure>
        <h2 className="text-[1.4rem] xs:text-[1.55rem] md:text-[2rem]  lg:text-4xl font-semibold z-10 tracking-tight">
          Explore our trusted clinics
        </h2>
        <div className="max-w-[35rem] lg:max-w-[35rem]  text-center space-y-5 z-10">
          <p className="text-sm md:text-base">
            Your health journey starts here. Get all the info you need about
            clinics and schedule an appointment anytime, anywhere - all without
            leaving your spot.
          </p>
          <ClinicSearch
            textSearch
            className="max-w-[25rem] sm:max-w-fit lg:w-fit mx-auto py-[.85rem] sm:py-5 "
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[23rem] sm:max-w-full space-y-4">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-muted font-medium border border-muted-foreground/50 px-3 pr-4 py-1 w-fit rounded-sm">
          <ListFilter className="size-5" />
          <span className="text-sm md:text-[.95rem]">Filters</span>
        </div>
        <div className="flex items-center flex-col gap-y-10 sm:gap-y-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <ClinicInfoCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;
