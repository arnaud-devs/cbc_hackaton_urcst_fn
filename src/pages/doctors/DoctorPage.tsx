import BookingBtn from "@/components/Appointment/BookingBtn";
import CustomBreadcrumb from "@/components/header/CustomBreadcrumb";
import { useNavbarContext } from "@/context/NavbarContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Clock3, MapPin, Phone, Star } from "lucide-react";
import { IoPricetagsOutline } from "react-icons/io5";
import Review from "@/components/clinic/Review";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

const data = {
  id: "doctor_1",
  name: "Dr. Alice Uwimana",
  specialty: "Cardiologist",
  hospital: "King Faisal Hospital",
  location: "KN Ave, Kigali, Rwanda",
  phone: "+250 788 808834",
  email: "alice.uwimana@hospital.rw",
  price: "5,000 RWF / Consultation",
  hours: "Mon - Fri, 8:00 AM - 5:00 PM",
  available: true,
  bio: "Dr. Alice Uwimana is a board-certified Cardiologist with over 12 years of clinical experience. She specializes in preventive cardiology, heart failure management, and minimally invasive cardiac procedures. Her patient-first approach ensures personalized, compassionate care for every individual.",
  specialties: [
    "Cardiology",
    "Echocardiography",
    "Heart Failure",
    "Hypertension",
    "Preventive Care",
    "Consultation",
    "Cardiac Rehabilitation",
    "Arrhythmia",
    "Chest Pain Evaluation",
    "Lipid Management",
  ],
};

const DoctorPage = () => {
  useDocumentTitle(data.name);
  const { setActiveItem, setBreadcrumb } = useNavbarContext();
  setActiveItem("Doctors");

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Doctors", href: "/doctors" }],
      page: data.name,
    });
  }, [setBreadcrumb]);

  return (
    <div className="relative mt-10 mb-20 space-y-8 sm:space-y-10 mx-[5%] sm:mx-[6%] lg:mx-[10%]">
      <div>
        <CustomBreadcrumb />
      </div>
      <div className="flex gap-5 flex-wrap lg:flex-nowrap lg:gap-8">
        <figure className="relative w-full h-[13rem] xs:h-[16rem] md:w-[30rem] sm:h-[21rem] lg:w-[34rem] lg:h-[23rem] xl:w-[38rem] xl:h-[26rem] bg-muted rounded-sm overflow-hidden flex items-center justify-center">
          <div
            className={`absolute top-3 left-3 z-10 px-3 py-1 rounded text-xs font-medium text-white ${data.available ? "bg-green-500" : "bg-red-500"}`}
          >
            {data.available ? "Available Today" : "Unavailable"}
          </div>
          <img
            src="/user-profile.png"
            alt={data.name}
            className="w-48 h-56 object-cover opacity-80 mt-6"
          />
        </figure>
        <div className="space-y-4 lg:space-y-6">
          <div>
            <h2 className="text-[1.2rem] sm:text-xl md:text-[1.3rem] lg:text-2xl font-semibold">
              {data.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Icon icon="hugeicons:doctor-01" width="18" height="18" className="text-primary" />
              <span className="text-primary font-medium text-sm">
                {data.specialty} &mdash; {data.hospital}
              </span>
            </div>
            <div className="flex items-center gap-x-[1px] mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="size-[.95rem] sm:size-[1.2rem]" key={index}>
                  <Star stroke="" fill="#ffb900" className="!size-full" />
                </div>
              ))}
              <span className="text-xs sm:text-sm font-medium ml-1">5.0</span>
            </div>
          </div>
          <div className="space-y-4 xl:space-y-5 text-sm md:text-[.93rem] lg:text-base">
            <div className="flex items-center gap-x-1">
              <span className="block size-[.9rem] sm:size-[1.1rem] text-primary">
                <Clock3 className="!size-full" />
              </span>
              <span className="font-medium">{data.hours}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="block size-[1rem] sm:size-[1.1rem] text-primary">
                <MapPin className="!size-full" />
              </span>
              <span className="font-medium">{data.location}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="block size-[.9rem] sm:size-[1.1rem] text-primary">
                <Phone className="!size-full" />
              </span>
              <a
                href={`tel:${data.phone}`}
                target="_blank"
                className="font-medium hover:underline"
              >
                {data.phone}
              </a>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="block size-[.9rem] sm:size-[1.1rem] text-primary">
                <IoPricetagsOutline className="!size-full" />
              </span>
              <span className="font-medium">{data.price}</span>
            </div>
          </div>
          <BookingBtn href={data.id} className="mt-3 lg:mt-6" outline={false} />
        </div>
      </div>
      <div>
        <h2 className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.25rem] lg:text-[1.35rem] font-semibold">
          About {data.name}
        </h2>
        <p className="mt-3 text-[.9rem] text-justify md:text-base">{data.bio}</p>
      </div>
      <div>
        <h2 className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.25rem] lg:text-[1.35rem] font-semibold">
          Specialties &amp; Services
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-2 mt-4 overflow-hidden">
          {data.specialties.map((s, index) => (
            <div
              key={index}
              className="flex items-center border border-primary bg-primary/5 px-[.65rem] md:px-4 h-[1.8rem] rounded-md text-[.8rem] sm:text-[.85rem] lg:text-[.9rem]"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.25rem] lg:text-[1.35rem] font-semibold">
          Ratings and reviews
        </h2>
        <div className="flex gap-x-1 md:gap-x-2 lg:gap-x-3 items-end mt-5">
          <span className="text-5xl sm:text-6xl">5.0</span>
          <div className="mb-1">
            <div className="flex gap-x-[2px]">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="size-[.9rem] sm:size-[1.1rem]" key={index}>
                  <Star stroke="" fill="#ffb900" className="!size-full" />
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-[.9rem] -mt-[1px]">(27 reviews)</p>
          </div>
        </div>
        <div className="space-y-8 mt-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <Review key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
