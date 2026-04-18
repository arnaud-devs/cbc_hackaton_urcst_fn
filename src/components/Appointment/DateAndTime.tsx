import { Calendar } from "@/components/ui/calendar";
import { Input } from "../ui/input";
import { motion } from "framer-motion";

const DateAndTime = ({ movedForward }: { movedForward: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: movedForward ? 500 : -500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",

        ease: "easeInOut",
      }}
      className="max-w-[20rem]  mx-auto w-full sm:max-w-full"
    >
      <h2 className="font-medium text-lg md:text-xl mb-3">
        Choose Date and Time
      </h2>
      <div className="flex flex-col sm:flex-row justify-between">
        <Calendar
          mode="single"
          className="sm:w-[68%] md:w-[55%] !p-0 w-full"
          classNames={{
            weekdays: "flex mb-3 sm:mb-5",
            week: "flex w-full gap-2 justify-between px-2 mt-1",
            day_button:
              "!rounded-full hover:bg-chart-2/25  sm:!size-9 md:!size-10",
            today:
              "box-content !rounded-full border border-chart-2 bg-chart-2/10 hover:!bg-chart-2/25 sm:!size-9 md:!size-10 ",
          }}
          modifiersClassNames={{}}
        />
        <div className="my-6 sm:my-0 sm:mx-[5%] md:mx-[8%] lg:mx-[11%]  bg-muted w-full h-[1px] sm:w-[2px] sm:h-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-1 mt-auto md:mr-auto gap-3 sm:gap-2 md:gap-3 w-[80%] mx-auto sm:w-32">
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="09:30:00"
            readOnly
            className="h-9 sm:h-10 lg:h-11 cursor-pointer justify-center border-muted-foreground text-muted-foreground hover:bg-chart-2/25 hover:text-black hover:border-chart-2 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="11:00:00"
            readOnly
            className="h-9 sm:h-10 lg:h-11 cursor-pointer justify-center border-muted-foreground text-muted-foreground hover:bg-chart-2/25 hover:text-black hover:border-chart-2 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="02:00:00"
            readOnly
            className="h-9 sm:h-10 lg:h-11 cursor-pointer justify-center border-muted-foreground text-muted-foreground hover:bg-chart-2/25 hover:text-black hover:border-chart-2 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="15:30:00"
            readOnly
            className="h-9 sm:h-10 lg:h-11 cursor-pointer justify-center border-muted-foreground text-muted-foreground hover:bg-chart-2/25 hover:text-black hover:border-chart-2 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="15:30:00"
            readOnly
            className="h-9 sm:h-10 lg:h-11 cursor-pointer justify-center border-muted-foreground text-muted-foreground hover:bg-chart-2/25 hover:text-black hover:border-chart-2 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DateAndTime;
