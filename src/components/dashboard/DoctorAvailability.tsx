import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Info } from "lucide-react";
import { isSameDay } from "date-fns";

const DoctorAvailability = ({ className }: { className?: string }) => {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });
  const [isPartTime, setIsPartTime] = useState(true);

  const randomNumber = Math.floor(Math.random() * 3) + 1;

  return (
    <Dialog>
      <form>
        <DialogTrigger className={className} asChild>
          <Button className="!h-10 !px-4">Change Availability</Button>
        </DialogTrigger>
        <DialogContent className="pt-12 max-xs:px-4 overflow-auto max-h-[85vh]  md:max-w-[46rem] lg:max-w-[50rem]">
          <DialogHeader className="gap-y-0.5">
            <DialogTitle>
              Dr. John Doe&nbsp;|&nbsp;<span>Cardiologist</span>
            </DialogTitle>
            <DialogDescription>
              Schedule and manage doctor's availability.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col max-md:items-center md:flex-row justify-between">
            <Calendar
              mode="range"
              className="w-full md:max-w-[21rem]"
              classNames={{
                weekdays: "flex mb-3 sm:mb-5",
                week: "flex w-full gap-2 justify-between mt-1",
                day_button:
                  "!rounded-full hover:bg-chart-2/25 sm:!size-9 md:!size-10 data-[range-middle=true]:bg-primary/20",
                today:
                  "box-content !rounded-full border border-chart-2 bg-chart-2/10 hover:!bg-chart-2/25 sm:!size-9 md:!size-10 ",
              }}
              selected={date}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDate(range as unknown as { from: Date; to: Date });
                }
              }}
            />
            <div className="my-6 md:my-0 sm:mx-8 md:mx-7 lg:mx-10  bg-muted w-full h-[1px] md:w-[2px] md:h-auto" />
            <div className="w-full flex-1 space-y-7">
              <h4 className="flex items-center gap-x-2">
                <span>
                  <CalendarDays strokeWidth={1.5} className="size-5" />
                </span>
                <span>
                  {format(date.from, "dd MMM, yyyy")}
                  {!isSameDay(new Date(date.to), new Date(date.from)) &&
                    ` - ${format(date.to, "dd MMM, yyyy")}`}
                </span>
              </h4>
              <div>
                <h3 className="font-medium">Availability</h3>
                <div className="flex items-center text-[.85rem]">
                  {randomNumber == 1 && (
                    <div className="flex items-center gap-1 ">
                      <span className="block rounded-full size-3 bg-green-500" />
                      <span>Available</span>
                    </div>
                  )}

                  {randomNumber == 2 && (
                    <div className="flex items-center gap-1 ">
                      <span className="block rounded-full size-3 bg-red-500" />
                      <span>Unavailable</span>
                    </div>
                  )}

                  {randomNumber == 3 && (
                    <div className="flex items-center gap-1 ">
                      <span className="block rounded-full size-3  bg-gradient-to-r from-50% to-50% from-red-500 to-green-500" />
                      <span>Mixed (Available & Unavailable)</span>
                    </div>
                  )}

                  {isSameDay(new Date(date.to), new Date(date.from)) &&
                    isSameDay(new Date(date.to), new Date()) && (
                      <span>&nbsp;-&nbsp;Today</span>
                    )}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Set the date's Availability</h3>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 lg:gap-x-5 text-[.85rem]">
                  <div className="flex items-center gap-1">
                    <Input
                      type="radio"
                      name="availability"
                      className="!size-4 !ring-0"
                      id="part-time"
                      onClick={() => setIsPartTime(true)}
                      defaultChecked
                    />
                    <Label
                      className="font-light text-nowrap"
                      htmlFor="part-time"
                    >
                      Part Time
                    </Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="radio"
                      name="availability"
                      className="!size-4 !ring-0"
                      onClick={() => setIsPartTime(false)}
                      id="full-time"
                    />
                    <Label
                      className="font-light text-nowrap"
                      htmlFor="full-time"
                    >
                      Full Time
                    </Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="radio"
                      name="availability"
                      className="!size-4 !ring-0"
                      onClick={() => setIsPartTime(false)}
                      id="Unavailable"
                    />
                    <Label className="font-light" htmlFor="Unavailable">
                      Unavailable
                    </Label>
                  </div>
                </div>
                {isPartTime && (
                  <>
                    {!isSameDay(new Date(date.to), new Date(date.from)) && (
                      <p className="italic text-muted-foreground/70 flex gap-1 text-sm items-center my-2 leading-4">
                        <Info className="size-4" /> Time set will be applied to
                        whole date range
                      </p>
                    )}
                    <div className="flex gap-x-3">
                      <div className="">
                        <Label
                          className="font-light mb-1"
                          htmlFor="Unavailable"
                        >
                          Start Time:
                        </Label>
                        <Input
                          type="time"
                          name="start-time"
                          className="!h-10"
                        />
                      </div>
                      <div className="">
                        <Label
                          className="font-light mb-1"
                          htmlFor="Unavailable"
                        >
                          End Time:
                        </Label>
                        <Input type="time" name="end-time" className="!h-10" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div></div>
            </div>
          </div>
          <DialogFooter className="max-md:!flex-col-reverse">
            <DialogClose asChild>
              <Button variant="ghost">Dismiss</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DoctorAvailability;
