import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import SocialMedia from "../home/SocialMedia";
import MediaQuery from "react-responsive";
import { useState } from "react";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MediaQuery maxWidth={1023}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="h-[2.15rem] sm:h-10 bg-primary/15 hover:bg-primary/25 lg:hidden text-primary rounded  !px-[6px] sm:!px-2"
          >
            <CgMenuLeft strokeWidth={0.7} className=" size-7 sm:size-8" />
          </Button>
        </DialogTrigger>
        <DialogContent
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          className="top-0 right-0 left-auto translate-0 sm:max-w-[30rem] min-h-screen rounded-none data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=open]:slide-in-from-right-80 data-[state=open]:fade-in
    data-[state=closed]:slide-out-to-right-80 data-[state=closed]:fade-out
    !duration-300 data-[state=closed]:zoom-out-100 data-[state=open]:-zoom-in-100"
        >
          <div className="flex flex-col items-center justify-end gap-y-14 h-full ">
            <NavItems setIsOpen={setIsOpen} className="gap-y-5 md:gap-y-8" />
            <div className="space-y-5 max-w-[13.5rem] w-full ">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary px-4 xl:px-6 w-full"
              >
                <span>Book Appointment</span>
              </Button>
              <Button size="lg" className="h-11 p-0 w-full">
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center gap-2 size-full  px-4 py-3 xl:px-6"
                >
                  <figure className="size-5">
                    <LogIn className="size-full" />
                  </figure>
                  <span>Login</span>
                </Link>
              </Button>
            </div>
          </div>
          <DialogFooter className="items-center justify-center sm:items-center sm:justify-center">
            <SocialMedia
              className="max-w-52"
              childrenClassName="bg-primary/10 hover:bg-primary/25"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MediaQuery>
  );
};

export default MobileNavBar;
