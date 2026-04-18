import { BriefcaseMedical, PencilLine } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { motion } from "framer-motion";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  isActive: boolean;
}

const Service = ({
  movedForward,
  serviceId,
  clientDetail,
  services,
  onChange,
}: {
  movedForward: boolean;
  serviceId: string;
  clientDetail: string;
  services: ServiceItem[];
  onChange: (field: "serviceId" | "clientDetail", value: string) => void;
}) => {
  const selected = services.find((s) => s.id === serviceId);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
      className="space-y-4 sm:space-y-5 w-full"
    >
      <h2 className="font-medium text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">Service Selection</h2>

      {/* Service dropdown */}
      <div className="relative">
        <BriefcaseMedical strokeWidth={1.2} className="absolute inset-y-0 my-auto left-3 sm:left-5 size-5 text-muted-foreground" />
        <select
          value={serviceId}
          onChange={(e) => onChange("serviceId", e.target.value)}
          className="w-full h-10 sm:h-11 border border-input rounded-md pl-9 sm:pl-12 pr-4 text-sm bg-background"
        >
          <option value="">Select a service *</option>
          {services.filter((s) => s.isActive).map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="relative">
        <PencilLine strokeWidth={1.2} className="absolute top-3 left-3 sm:left-5 size-5 text-muted-foreground" />
        <Textarea
          placeholder="Additional notes for the doctor [Optional]"
          value={clientDetail}
          onChange={(e) => onChange("clientDetail", e.target.value)}
          className="min-h-28 px-9 sm:px-12 py-3"
        />
      </div>

      {/* Service overview */}
      {selected && (
        <div className="rounded-md bg-gray-100 p-5 shadow-sm">
          <h3 className="text-base font-semibold">{selected.name}</h3>
          <p className="text-[.9rem] text-muted-foreground mt-1">{selected.description}</p>
          <p className="text-[.85rem] text-muted-foreground mt-2">Duration: Approx. {selected.durationMinutes} minutes</p>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <Checkbox id="terms" className="size-5 cursor-pointer" />
        <Label htmlFor="terms">
          Accept the{" "}
          <a href="#" className="text-green-600 hover:underline">Appointment terms</a>
          {" "}and{" "}
          <a href="#" className="text-green-600 hover:underline">Cancellation policy.</a>
        </Label>
      </div>
    </motion.div>
  );
};

export default Service;
