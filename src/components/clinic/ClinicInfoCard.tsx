import { MapPin, Phone, Star } from "lucide-react";
import BookingBtn from "../Appointment/BookingBtn";
import { Link } from "react-router-dom";
import OpenAndClosedBadge from "./OpenAndClosedBadge";

export const ClinicInfoCard = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-y-1 gap-x-4 md:gap-x-6 lg:gap-x-8 border-b pb-6">
      <div className="">
        <figure className="cursor-pointer hover:brightness-90 duration-300 relative w-full h-[13rem] min-w-[19rem] sm:w-[18rem] sm:h-[14.6rem]  md:w-[22rem] md:h-[15rem] lg:w-[24rem] lg:h-[16.5rem] xl:w-[26rem]  rounded-md overflow-hidden">
          <OpenAndClosedBadge isOpen />
          <Link to="chuk">
            <img
              src="https://placehold.co/600x400"
              alt="clinic"
              className="size-full object-cover"
            />
          </Link>
        </figure>
      </div>
      <div className="flex flex-col justify-between gap-1 px-1 sm:px-0 ">
        <div className="flex flex-wrap items-center gap-x-4 ">
          <div className="flex items-center gap-1">
            <div>
              <span
                className="block size-[.75rem] bg-green-500 rounded-full"
                title=""
              />
            </div>
            <h2 className="cursor-pointer hover:underline hover:text-primary text-xl md:text-[1.4rem] lg:text-2xl font-semibold line-clamp-1">
              <Link to="chuck">CHUK</Link>
            </h2>
          </div>
          <div className="flex items-center gap-x-[1px]">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="size-[.95rem] sm:size-[1.2rem]" key={index}>
                <Star stroke="" fill="#ffb900" className="!size-full" />
              </div>
            ))}
            <span className="text-xs sm:text-sm font-medium ml-1">5.0</span>
          </div>
        </div>
        <div className="space-y-1  text-primary text-sm sm:text-[.9rem]">
          <div className="flex items-center gap-x-1 ">
            <span className="block size-[1rem] sm:size-[1.1rem] text-primary">
              <MapPin className="!size-full" />
            </span>
            <span className="font-medium">KN Ave, Kigali, Rwanda</span>
          </div>
          <div className="flex items-center gap-x-1 ">
            <span className="block size-[.9rem] sm:size-[1rem] text-primary">
              <Phone className="!size-full" />
            </span>
            <a
              href="tel:0788888888"
              target="_blank"
              className="font-medium hover:underline"
            >
              +250 788 808834
            </a>
          </div>
        </div>
        <p className="text-justify line-clamp-3 sm:line-clamp-2 lg:line-clamp-3 text-muted-foreground text-[.95rem] lg:text-base leading-5 md:leading-[1.4rem]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
          quos voluptas molestias accusamus voluptatum, provident laudantium
          eaque nam, eius debitis maiores? Ipsa eius quae omnis labore ab
          accusantium impedit. Quia!eaque nam, eius debitis maiores? Ipsa eius
          quae omnis labore ab accusantium impedit. Quia!eaque nam, eius debitis
          maiores? Ipsa eius quae omnis labore ab accusantium impedit. Quia!
          accusantium impedit. Quia!eaque nam, eius debitis maiores? Ipsa eius
          quae omnis labore ab accusantium impedit. Quia!eaque nam, eius debitis
          maiores? Ipsa eius quae omnis labore ab accusantium impedit. Quia!
        </p>
        <div className="flex flex-wrap h-[1.7rem]  gap-1 sm:gap-2 mt-2 overflow-hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center border border-primary bg-primary/5 px-[.65rem] md:px-4 h-[1.7rem] rounded-md text-[.8rem] sm:text-[.85rem] lg:text-[.9rem]"
            >
              Consultation
            </div>
          ))}
        </div>
        <BookingBtn href="32242" outline={false} className="w-fit mt-2" />
      </div>
    </div>
  );
};
