import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClinicHighlightCard = ({
  name,
  location,
}: {
  name: string;
  location: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/clinics/${name}`)}
      className="group/card w-full  max-w-[20rem] relative size-fit cursor-pointer bordr border-black/5 shadow-md rounded-sm overflow-hidden"
    >
      <figure className="w-full h-[11rem] sm:h-[13rem] md:h-[12rem] lg:h-[15rem] rounded-sm overflow-hidden ">
        <img
          src="https://placehold.co/600x400"
          alt="Clinic_Thumbnail"
          className="!size-full object-cover"
        />
      </figure>
      <div className="z-10 bg-gradient-to-t from-black/70 to-transparent  h-[60%] group-hover/card:h-full  absolute inset-0 mt-auto duration-300 " />
      <div className="absolute bottom-0 z-20 text-white p-3 sm:p-4 space-y-1">
        <div className="flex flex-wrap items-center gap-x-4">
          <div className="flex items-center gap-x-1">
            <div>
              <span
                className="animate-pulse block size-[.7rem] bg-green-500 rounded-full"
                title=""
              />
            </div>
            <h2 className="line-clamp-1 font-semibold text-base sm:text-lg leading-4">
              {name}
            </h2>
          </div>
          <div className="flex items-center gap-x-[1px]">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="size-[.9rem] sm:size-4" key={index}>
                <Star stroke="" fill="#ffb900" className="!size-full" />
              </div>
            ))}
            <span className="text-xs sm:text-sm font-medium ml-1">5.0</span>
          </div>
        </div>
        <p className="flex items-center gap-x-1 text-xs sm:text-sm ">
          <span className="block size-[.9rem] sm:size-4">
            <MapPin className="!size-full" />
          </span>
          {location}
        </p>
      </div>
    </div>
  );
};

export default ClinicHighlightCard;
