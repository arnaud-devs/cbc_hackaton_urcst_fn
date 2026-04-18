import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { useScroll } from "framer-motion";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import MobileNavBar from "./MobileNavBar";
import BookingBtn from "../Appointment/BookingBtn";

const NavBar = () => {
  const { scrollY } = useScroll();
  const [shadowClass, setShadowClass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return scrollY.on("change", (y) => {
      if (y > 35) setShadowClass(true);
      else setShadowClass(false);
    });
  }, [scrollY]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-3 px-[5%] ">
      <div
        className={
          " absolute top-0 -z-10 left-0 size-full bg-background " +
          (shadowClass ? "shadow-2xl" : "")
        }
      />
      <div
        className="cursor-pointer flex items-center gap-1 sm:gap-2 text-primary font-semibold"
        onClick={() => navigate("/")}
      >
        <figure>
          <img
            src="/logo.png"
            className="w-[2.6rem] sm:w-[3rem] md:w-[3.3rem]"
            alt="Huza-Care-Logo"
          />
        </figure>
        <span className="text-base sm:text-xl">HuzaCare</span>
      </div>
      <div className="hidden lg:block">
        <NavItems />
      </div>
      <div className="flex items-center gap-4">
        <BookingBtn href="" className="hidden sm:flex lg:px-6" />
        <Button
          size="lg"
          className="h-[2.15rem] sm:hidden block bg-primary/15 hover:bg-primary/25 lg:hidden text-primary rounded  !px-[6px]"
          onClick={() => navigate("/book")}
        >
          <Icon
            icon="healthicons:i-schedule-school-date-time"
            className="size-[2.1rem] "
          />
        </Button>
        <Button size="lg" className="hidden lg:block h-9 md:h-10 p-0">
          <Link
            to="/auth/login"
            className="flex items-center gap-2 size-full  px-4 py-3 xl:px-6"
          >
            <figure className="size-5">
              <LogIn className="size-full" />
            </figure>
            <span>Login</span>
          </Link>
        </Button>
        <MobileNavBar />
      </div>
    </nav>
  );
};

export default NavBar;
