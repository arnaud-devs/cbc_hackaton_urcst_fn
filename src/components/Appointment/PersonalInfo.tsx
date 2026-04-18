import { Globe, Mail, MapPin, Phone, User } from "lucide-react";
import { Input } from "../ui/input";
import { DobPicker } from "./DobPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HiLanguage } from "react-icons/hi2";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";

const PersonalInfo = ({ movedForward }: { movedForward: boolean }) => {
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
        Fill your Personal Information
      </h2>
      <div className="flex flex-col gap-3 sm:gap-5">
        <div className="relative ">
          <div className="absolute inset-0 my-auto left-3 sm:left-5 size-5">
            <User
              strokeWidth={1.5}
              className="size-full text-muted-foreground"
            />
          </div>
          <Input
            type="text"
            placeholder="Full Name"
            className="w-full px-9 sm:px-12"
          />
        </div>
        <div className="flex  justify-between gap-2 sm:gap-3">
          <DobPicker />
          <fieldset className="border border-input rounded -mt-[9px] sm:w-2/4 flex justify-center pb-1 gap-2 xs:gap-3 sm:gap-5 px-3 xs:px-4 sm:px-5">
            <legend className="text-[.8rem] sm:text-sm">Gender</legend>
            <div className="relative flex items-center gap-[2px] sm:gap-1">
              <Input
                type="radio"
                name="gender"
                className="w-full size-4 sm:size-[18px]"
              />
              <Label className="font-light text-sm sm:text-[.95rem]">
                Male
              </Label>
            </div>
            <div className="relative flex items-center gap-[2px] sm:gap-1">
              <Input
                type="radio"
                name="gender"
                className="w-full size-4 sm:size-[18px]"
              />
              <Label className="font-light text-sm sm:text-[.95rem]">
                Female
              </Label>
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Select>
            <SelectTrigger className="relative !h-10 sm:!h-11 placeholder:!text-muted-foreground w-full sm:w-1/2 pl-9 sm:pl-12 pr-5">
              <div className="absolute inset-0 my-auto left-3 sm:left-[18px] size-5">
                <Globe
                  strokeWidth={1.2}
                  className="size-full text-muted-foreground"
                />
              </div>
              <SelectValue
                className="!text-red-200"
                placeholder="Select nationality"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rwandan">Rwandan</SelectItem>
              <SelectItem value="ugandan">Ugandan</SelectItem>
              <SelectItem value="kenyan">Kenyan</SelectItem>
              <SelectItem value="burundian">Burundian</SelectItem>
              <SelectItem value="tanzanian">Tanzanian</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="relative !h-10 sm:!h-11 placeholder:!text-muted-foreground w-full sm:w-1/2 pl-9 sm:pl-12 pr-5">
              <div className="absolute inset-0 my-auto left-3 sm:left-5 size-[18px]">
                <HiLanguage className="size-full text-muted-foreground" />
              </div>
              <SelectValue
                className="!text-red-200"
                placeholder="Preferred Language"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="rw">Kinyarwanda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative w-full">
            <div className="absolute inset-0 my-auto left-3 sm:left-5 size-[18px]">
              <Phone
                strokeWidth={1.5}
                className="size-full text-muted-foreground"
              />
            </div>
            <Input
              type="tel"
              placeholder="Telephone"
              className="w-full px-9 sm:px-12"
            />
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 my-auto left-3 sm:left-5 size-5">
              <Mail
                strokeWidth={1.3}
                className="size-full text-muted-foreground"
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              className="w-full px-9 sm:px-12"
            />
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute inset-0 my-auto left-3 sm:left-5 size-5">
            <MapPin
              strokeWidth={1.3}
              className="size-full text-muted-foreground"
            />
          </div>
          <Input
            type="text"
            placeholder="Home Address"
            className="w-full px-9 sm:px-12"
          />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <Checkbox id="confirm-info" className="size-5 cursor-pointer" />
        <Label htmlFor="confirm-info">
          I confirm that the information provided is correct.
        </Label>
      </div>
    </motion.form>
  );
};

export default PersonalInfo;
