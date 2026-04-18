import { useNavbarContext } from "@/context/NavbarContext";
import { ListFilter, MapPin, Phone, Star } from "lucide-react";
import heroBackgroundLines from "@/assets/hero_background_lines.png";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BookingBtn from "@/components/Appointment/BookingBtn";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Practice",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "Surgery",
];

const mockDoctors = Array.from({ length: 10 }, (_, i) => ({
  id: `doctor_${i + 1}`,
  name: `Dr. ${["Alice Uwimana", "Jean Mugisha", "Marie Ishimwe", "Patrick Nkurunziza", "Grace Ineza", "Eric Habimana", "Sandra Mukamana", "David Nsabimana", "Clara Uwineza", "Robert Bizimana"][i]}`,
  specialty: specialties[i % specialties.length],
  hospital: "King Faisal Hospital, Kigali",
  location: "KN Ave, Kigali, Rwanda",
  phone: "+250 788 808834",
  rating: 4.8,
  reviews: 27,
  price: "5,000 RWF / Consultation",
  bio: "Experienced specialist with over 10 years of practice, dedicated to providing compassionate and evidence-based care to every patient.",
  available: i % 3 !== 2,
}));

const DoctorCard = ({ doctor }: { doctor: (typeof mockDoctors)[0] }) => (
  <div className="flex flex-col sm:flex-row gap-y-1 gap-x-4 md:gap-x-6 lg:gap-x-8 border-b pb-6">
    <figure className="cursor-pointer hover:brightness-90 duration-300 relative w-full h-[13rem] min-w-[19rem] sm:w-[18rem] sm:h-[14.6rem] md:w-[22rem] md:h-[15rem] lg:w-[24rem] lg:h-[16.5rem] xl:w-[26rem] rounded-md overflow-hidden bg-muted flex items-center justify-center">
      <div
        className={`absolute top-3 left-3 z-10 px-2 py-[2px] rounded text-xs font-medium text-white ${doctor.available ? "bg-green-500" : "bg-red-500"}`}
      >
        {doctor.available ? "Available" : "Unavailable"}
      </div>
      <Link to={doctor.id}>
        <img
          src="/user-profile.png"
          alt={doctor.name}
          className="w-40 h-44 object-cover opacity-80 mt-4 mx-auto"
        />
      </Link>
    </figure>
    <div className="flex flex-col justify-between gap-1 px-1 sm:px-0">
      <div className="flex flex-wrap items-center gap-x-4">
        <div className="flex items-center gap-2">
          <span
            className={`block size-3 rounded-full ${doctor.available ? "bg-green-500" : "bg-red-500"}`}
          />
          <h2 className="cursor-pointer hover:underline hover:text-primary text-xl md:text-[1.4rem] lg:text-2xl font-semibold">
            <Link to={doctor.id}>{doctor.name}</Link>
          </h2>
        </div>
        <div className="flex items-center gap-x-[1px]">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="size-[.95rem] sm:size-[1.2rem]" key={index}>
              <Star stroke="" fill="#ffb900" className="!size-full" />
            </div>
          ))}
          <span className="text-xs sm:text-sm font-medium ml-1">
            {doctor.rating} ({doctor.reviews} reviews)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-primary font-medium text-sm">
        <Icon icon="hugeicons:doctor-01" width="18" height="18" />
        <span>{doctor.specialty}</span>
      </div>
      <div className="space-y-1 text-primary text-sm sm:text-[.9rem]">
        <div className="flex items-center gap-x-1">
          <MapPin className="size-4" />
          <span className="font-medium">{doctor.location}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <Phone className="size-4" />
          <a
            href={`tel:${doctor.phone}`}
            target="_blank"
            className="font-medium hover:underline"
          >
            {doctor.phone}
          </a>
        </div>
      </div>
      <p className="text-justify line-clamp-3 sm:line-clamp-2 lg:line-clamp-3 text-muted-foreground text-[.95rem] lg:text-base leading-5 md:leading-[1.4rem]">
        {doctor.bio}
      </p>
      <div className="flex flex-wrap h-[1.7rem] gap-1 sm:gap-2 mt-2 overflow-hidden">
        <div className="flex items-center border border-primary bg-primary/5 px-3 h-[1.7rem] rounded-md text-[.8rem]">
          {doctor.specialty}
        </div>
        <div className="flex items-center border border-muted-foreground/40 bg-muted/30 px-3 h-[1.7rem] rounded-md text-[.8rem]">
          Consultation
        </div>
        <div className="flex items-center border border-muted-foreground/40 bg-muted/30 px-3 h-[1.7rem] rounded-md text-[.8rem]">
          {doctor.price}
        </div>
      </div>
      <BookingBtn href={doctor.id} outline={false} className="w-fit mt-2" />
    </div>
  </div>
);

const DoctorsListing = () => {
  const { setActiveItem } = useNavbarContext();
  setActiveItem("Doctors");
  useDocumentTitle("Find a Doctor");

  return (
    <div className="relative mt-10 mb-20 space-y-8 mx-[5%]">
      <div className="relative flex flex-col gap-y-3 sm:gap-y-6 lg:gap-y-8 justify-center items-center bg-primary text-white px-5 pt-14 pb-8 sm:pt-20 sm:pb-12 rounded-xl overflow-hidden">
        <figure className="absolute -top-[60%] -left-10 w-[105%] h-[120%] -rotate-[5deg] brightness-120 z-0">
          <img
            src={heroBackgroundLines}
            alt="background_lines"
            className="size-full"
          />
        </figure>
        <h2 className="text-[1.4rem] xs:text-[1.55rem] md:text-[2rem] lg:text-4xl font-semibold z-10 tracking-tight">
          Find your perfect doctor
        </h2>
        <div className="max-w-[35rem] lg:max-w-[35rem] text-center space-y-5 z-10">
          <p className="text-sm md:text-base">
            Browse verified doctors, check availability, and book your
            appointment directly — anytime, from anywhere.
          </p>
          <div className="relative mx-auto max-w-[25rem] sm:max-w-fit">
            <Search className="absolute inset-y-0 my-auto left-4 size-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by name, specialty…"
              className="pl-10 pr-4 py-5 sm:py-6 bg-white text-black rounded-full placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-white/60 border-0 min-w-[22rem]"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[23rem] sm:max-w-full space-y-4">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-muted font-medium border border-muted-foreground/50 px-3 pr-4 py-1 w-fit rounded-sm">
          <ListFilter className="size-5" />
          <span className="text-sm md:text-[.95rem]">Filters</span>
        </div>
        <div className="flex items-center flex-col gap-y-10 sm:gap-y-8">
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsListing;
