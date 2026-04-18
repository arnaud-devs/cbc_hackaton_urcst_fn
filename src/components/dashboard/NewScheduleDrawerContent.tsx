import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewScheduleDrawerContent = () => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="text-lg">New Schedule</DrawerTitle>
          <DrawerDescription>
            Show clients when you're available.
          </DrawerDescription>
        </DrawerHeader>
        <form className="p-4 space-y-4">
          <div>
            <p className="text-sm">Service Name</p>
            <Select>
              <SelectTrigger className="w-full !h-10">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Service 1</SelectItem>
                <SelectItem value="2">Service 2</SelectItem>
                <SelectItem value="3">Service 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm">Date</p>
            <Input type="date" multiple className="!h-10" />
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <p className="text-sm">Start Time</p>
              <Input type="time" className="!h-10" />
            </div>
            <div className="w-full">
              <p className="text-sm">End Time</p>
              <Input type="time" className="!h-10" />
            </div>
          </div>
          <div>
            <p className="text-sm">Capacity</p>
            <Input type="number" className="!h-10" />
          </div>
          <div>
            <p className="text-sm">Assign Doctor(s)</p>
            <Select>
              <SelectTrigger className="w-full !h-10">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Doctor 1</SelectItem>
                <SelectItem value="2">Doctor 2</SelectItem>
                <SelectItem value="3">Doctor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DrawerFooter>
          <Button>Add Slot</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};

export default NewScheduleDrawerContent;
