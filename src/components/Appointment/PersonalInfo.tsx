import { Globe, MapPin, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";

export interface PersonalData {
  clientPhone: string;
  clientAge: number | "";
  clientSex: "male" | "female";
  clientLanguage: string;
  clientAddress: string;
}

const PersonalInfo = ({
  movedForward,
  data,
  onChange,
}: {
  movedForward: boolean;
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string | number) => void;
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
      className="w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="font-medium text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">
        Fill your Personal Information
      </h2>
      <div className="flex flex-col gap-3 sm:gap-5">
        {/* Phone */}
        <div className="relative">
          <Phone strokeWidth={1.5} className="absolute inset-y-0 my-auto left-3 sm:left-5 size-5 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Phone number *"
            value={data.clientPhone}
            onChange={(e) => onChange("clientPhone", e.target.value)}
            className="w-full px-9 sm:px-12"
            required
          />
        </div>

        {/* Age + Sex */}
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Age *"
            min={1}
            max={120}
            value={data.clientAge}
            onChange={(e) => onChange("clientAge", Number(e.target.value))}
            className="w-28"
            required
          />
          <fieldset className="border border-input rounded flex items-center gap-4 px-4">
            <legend className="text-[.8rem] sm:text-sm px-1">Sex</legend>
            {(["male", "female"] as const).map((sex) => (
              <label key={sex} className="flex items-center gap-1 cursor-pointer text-sm capitalize">
                <input
                  type="radio"
                  name="sex"
                  checked={data.clientSex === sex}
                  onChange={() => onChange("clientSex", sex)}
                  className="size-4"
                />
                {sex}
              </label>
            ))}
          </fieldset>
        </div>

        {/* Language */}
        <div className="relative">
          <Globe strokeWidth={1.2} className="absolute inset-y-0 my-auto left-3 sm:left-5 size-5 text-muted-foreground" />
          <select
            value={data.clientLanguage}
            onChange={(e) => onChange("clientLanguage", e.target.value)}
            className="w-full h-10 sm:h-11 border border-input rounded-md pl-9 sm:pl-12 pr-4 text-sm bg-background"
          >
            <option value="">Preferred Language *</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Kinyarwanda">Kinyarwanda</option>
          </select>
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin strokeWidth={1.3} className="absolute inset-y-0 my-auto left-3 sm:left-5 size-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Home Address *"
            value={data.clientAddress}
            onChange={(e) => onChange("clientAddress", e.target.value)}
            className="w-full px-9 sm:px-12"
            required
          />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <Checkbox id="confirm-info" className="size-5 cursor-pointer" />
        <Label htmlFor="confirm-info">I confirm that the information provided is correct.</Label>
      </div>
    </motion.form>
  );
};

export default PersonalInfo;
