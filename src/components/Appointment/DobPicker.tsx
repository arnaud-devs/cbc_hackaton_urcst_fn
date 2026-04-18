import * as React from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DobPicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <div className="w-full relative flex gap-2">
      <Input
        id="date"
        value={value}
        placeholder="Date of birth"
        className="w-full pl-9 sm:pl-12"
        onChange={(e) => {
          const date = new Date(e.target.value);
          setValue(e.target.value);
          if (isValidDate(date)) {
            setDate(date);
            setMonth(date);
          }
        }}
        onKeyDown={() => setOpen(true)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="absolute inset-0 my-auto left-[10px] sm:left-[18px] !size-fit p-0 "
          asChild
        >
          <Button id="date-picker" variant="ghost" asChild>
            <CalendarDays
              strokeWidth={1.1}
              className="size-full text-muted-foreground"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="absolute w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setDate(date);
              setValue(formatDate(date));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
