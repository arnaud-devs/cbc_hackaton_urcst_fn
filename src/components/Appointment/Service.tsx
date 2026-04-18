import { BriefcaseMedical, PencilLine } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { motion } from "framer-motion";

const Service = ({ movedForward }: { movedForward: boolean }) => {
  return (
    <motion.form
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        ease: "easeInOut",
      }}
      action=""
      className="space-y-4 sm:space-y-5 w-full"
    >
      <h2 className="font-medium text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">
        Service Selection
      </h2>
      <Select>
        <SelectTrigger className="relative !h-10 sm:!h-11 placeholder:!text-muted-foreground w-full pl-9 sm:pl-12 pr-5">
          <div className="absolute inset-0 my-auto left-3 sm:left-[18px] size-5">
            <BriefcaseMedical
              strokeWidth={1.2}
              className="size-full text-muted-foreground"
            />
          </div>
          <SelectValue
            className="!text-red-200"
            placeholder="Select clinic service"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general_consultation">
            General Consultation
          </SelectItem>
          <SelectItem value="dental_checkup">Dental Check-up</SelectItem>
          <SelectItem value="eye_exam">Eye Examination</SelectItem>
          <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
          <SelectItem value="vaccination">Vaccination</SelectItem>
          <SelectItem value="lab_tests">Laboratory Tests</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative">
        <div className="absolute inset-0 top-3 left-3 sm:left-[18px] size-5">
          <PencilLine
            strokeWidth={1.2}
            className="size-full text-muted-foreground"
          />
        </div>
        <Textarea
          placeholder="Additional notes for the doctor or clinic [Optional]"
          className="min-h-28 px-9 sm:px-12 py-3"
        />
      </div>
      <div className="rounded-md bg-gray-200 /80 p-6 shadow-sm shadow-black/30">
        <h1 className="text-base md:text-lg font-semibold">Service Overview</h1>
        <ul className="list-inside leading-4 list-disc space-y-2 mt-2 ml-5 text-[.9rem] sm:text-[.95rem]">
          <li>Duration: Approx. 30 minutes</li>
          <li>
            Requirements(Optional): Bring ID, insurance card, and previous
            medical records
          </li>
          <li>
            Price: <span>10000</span> RWF
          </li>
          <li>Booking Fee: 500 RWF (deducted from total price)</li>
        </ul>
      </div>
      <div className="mt-10 flex items-center gap-2">
        <Checkbox id="terms" className="size-5 cursor-pointer" />
        <Label htmlFor="terms" className="block">
          Accept the &nbsp;
          <a href="#" className="text-green-600 cursor-pointer hover:underline">
            Appointment terms
          </a>
          &nbsp;and&nbsp;
          <a href="#" className="text-green-600 cursor-pointer hover:underline">
            Cancellation rescheduling policy.
          </a>
        </Label>
      </div>
    </motion.form>
  );
};

export default Service;
