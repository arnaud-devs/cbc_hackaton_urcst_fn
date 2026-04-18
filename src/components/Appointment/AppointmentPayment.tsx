import { Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
import MtnLogo from "/mtn-logo.png";
import AirtelLogo from "/airtel-logo.jpg";

const AppointmentPayment = ({ movedForward }: { movedForward: boolean }) => {
  return (
    <motion.form
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        ease: "easeInOut",
      }}
      className="w-full"
    >
      <h2 className="font-medium text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">
        Payment and Completion
      </h2>
      <div className="space-y-6  ">
        <div className="flex flex-col justify-center leading-6 h-[4.5rem] px-6 rounded bg-gray-200 shadow-md shadow-black/45">
          <div className="text-[.9rem] ">Booking fee</div>
          <div className="font-bold text-[1.2rem] text-nowrap">
            <span className="">RWF&nbsp;&nbsp;</span>
            <span>500</span>
          </div>
        </div>
        <div className="relative ">
          <div className="absolute inset-0 my-auto left-3 sm:left-5 size-5">
            <Phone
              strokeWidth={1.5}
              className="size-full text-muted-foreground"
            />
          </div>
          <div className="absolute inset-y-0 my-auto right-3 size-fit flex items-center gap-1">
            <figure className="size-7 sm:size-8 p-1 bg-yellow-400/90  rounded-full overflow-hidden">
              <img src={MtnLogo} alt="MTN_Logo" className="size-full" />
            </figure>
            <figure className="size-[20.5px] sm:size-[25px] p-1 bg-red-600/90 -ml-3 border-2 box-content border-white rounded-full overflow-hidden">
              <img src={AirtelLogo} alt="Airtel_Logo" className="size-full" />
            </figure>
          </div>
          <Input
            type="text"
            placeholder="Type payment number"
            className="w-full h-11 px-9 sm:px-12"
          />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Checkbox id="confirm-info" className="size-5 cursor-pointer" />
          <Label htmlFor="confirm-info" className="block">
            I have read and agree to our{" "}
            <a
              href="#"
              className="text-green-600 cursor-pointer hover:underline"
            >
              Payment & Refund Policy.
            </a>
          </Label>
        </div>
      </div>
    </motion.form>
  );
};

export default AppointmentPayment;
