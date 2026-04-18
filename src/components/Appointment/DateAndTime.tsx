import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { format } from "date-fns";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00",
  "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00",
];

const DateAndTime = ({
  movedForward,
  date,
  timeSlot,
  onChange,
}: {
  movedForward: boolean;
  date: Date | undefined;
  timeSlot: string;
  onChange: (field: "date" | "timeSlot", value: Date | string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
      className="max-w-[20rem] mx-auto w-full sm:max-w-full"
    >
      <h2 className="font-medium text-lg md:text-xl mb-3">Choose Date and Time</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && onChange("date", d)}
          disabled={{ before: new Date() }}
          className="sm:w-[60%] !p-0 w-full"
          classNames={{
            weekdays: "flex mb-3 sm:mb-5",
            week: "flex w-full gap-2 justify-between px-2 mt-1",
            day_button: "!rounded-full hover:bg-chart-2/25 sm:!size-9 md:!size-10",
            today: "box-content !rounded-full border border-chart-2 bg-chart-2/10 hover:!bg-chart-2/25 sm:!size-9 md:!size-10",
            selected: "!bg-primary !text-white !rounded-full",
          }}
        />
        <div className="my-4 sm:my-0 bg-muted w-full h-[1px] sm:w-[2px] sm:h-auto" />
        <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
          {date && (
            <p className="text-sm text-muted-foreground font-medium mb-1">
              {format(date, "EEE, MMM d yyyy")}
            </p>
          )}
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onChange("timeSlot", slot)}
                className={`h-9 sm:h-10 rounded-md border text-sm font-medium transition-colors ${
                  timeSlot === slot
                    ? "bg-primary text-white border-primary"
                    : "border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DateAndTime;
