import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ClinicSearch = ({
  className,
  textSearch = false,
}: {
  className?: string;
  textSearch?: boolean;
}) => {
  return (
    <form
      action=""
      className={`flex flex-col gap-y-2 gap-x-2 lg:gap-y-3 sm:flex-row bg-primary-foreground/10 shadow-xl px-4 py-6 sm:py-5 md:py-4 rounded-md backdrop-blur-sm ${className}`}
    >
      {!textSearch && (
        <>
          <div className="flex flex-wrap sm:flex-nowrap sm:w-3/4 justify-between flex-1 gap-y-3 gap-x-2">
            <Select>
              <SelectTrigger className=" flex-1 min-w-40 lg:w-48 !h-full data-[placeholder]:text-primary-foreground/85 border border-primary-foreground/70 bg-primary brightness-95 rounded-md">
                <SelectValue placeholder="Clinics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic1">Clinic 1</SelectItem>
                <SelectItem value="clinic2">Clinic 2</SelectItem>
                <SelectItem value="clinic3">Clinic 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="flex-1 min-w-40 md:w-1/2 data-[placeholder]:text-primary-foreground/85 lg:w-48 !h-full border border-primary-foreground/70 bg-primary brightness-95 rounded-md">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">Location 1</SelectItem>
                <SelectItem value="location2">Location 2</SelectItem>
                <SelectItem value="location3">Location 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            className="flex-1 sm:flex-none sm:w-1/4 mt-2 sm:mt-0 py-[6px]  bg-primary-foreground hover:bg-primary-foreground/95 hover:border-2 border-2 border-primary-foreground hover:border-primary text-primary px-8"
          >
            Book Now
          </Button>
        </>
      )}
      {textSearch && (
        <div className="w-full flex h-10 sm:h-11">
          <Input
            type="text"
            placeholder="Clinic name, location"
            className=" w-full max-w-80 sm:w-80 !h-full placeholder:text-primary-foreground border border-r-0 border-primary-foreground/70 bg-primary  rounded-l-md rounded-r-none"
          />
          <Button className="bg-background hover:bg-background/90 !h-full rounded-none rounded-r-sm  !px-4 lg:!px-5">
            <div className="size-4 md:size-[1.15rem] lg:size-5">
              <Search strokeWidth={2.5} className="size-full text-primary" />
            </div>
          </Button>
        </div>
      )}
    </form>
  );
};

export default ClinicSearch;
