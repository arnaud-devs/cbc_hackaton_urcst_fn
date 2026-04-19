import ClinicSearch from "../clinic/ClinicSearch";
import doctorHeroSectionImage from "@/assets/doctor_hero_section.png";
import heroBackgroundLines from "@/assets/hero_background_lines.png";
import doctorImage from "@/assets/doctor.png";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col sm:flex-row w-full items-center justify-center lg:justify-start xl:justify-center xl:gap-[5%] bg-primary text-primary-foreground mt-8 rounded-md overflow-hidden ">
      <figure className="absolute -top-[55%] -left-10 w-[105%] h-full bg-amber -rotate-[10deg] brightness-110">
        <img
          src={heroBackgroundLines}
          alt="background_lines"
          className="size-full"
        />
      </figure>
      <div className="w-full md:max-w-[52rem]  lg:max-w-[39.5rem] z-20 mx-[1%] mt-14 sm:mt-16 px-5 sm:px-8 md:px-12 md:mt-20 py-12">
        <div className="text-[1.45rem] xs:text-[1.6rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-4xl font-semibold leading-8 md:leading-10 xl:leading-12">
          <p>Why wait?</p>
          <p className="flex flex-col lg:flex-row text-nowrap gap-x-2 lg:w-[100%]">
            <span>Book your doctor</span>
            <span>appointment online.</span>
          </p>
          <p>Fast, easy, and reliable.</p>
        </div>
        <div className="space-y-4 mt-5 xs:mt-8 md:mt-12">
          <p className="max-w-[29rem] lg:max-w-none text-[.95rem] md:text-base text-justify">
            Skip the waiting room. Browse verified doctors, check their availability,
            and book your appointment in minutes — from anywhere.
          </p>
          <div className="relative">
            <figure className="absolute -bottom-1  -right-4 lg:hidden w-[13rem] sm:w-[14.5rem] md:w-[16rem] -z-10">
              <img
                src={doctorImage}
                alt="hero_image"
                className="size-full object-cover  opacity-95 brightness-65 md:brightness-75"
              />
            </figure>
          </div>
          <ClinicSearch />
        </div>
      </div>
      <div className="hidden lg:block absolute xl:relative bottom-0 right-[5%] lg:w-1/3 xl:w-fit mt-auto -mb-8 mr-[1.5%] z-10">
        <figure className=" size-[24rem] xl:size-[27rem] ">
          <img
            src={doctorHeroSectionImage}
            alt="hero_image"
            className="size-full object-cover "
          />
        </figure>
      </div>
    </div>
  );
};

export default HeroSection;
