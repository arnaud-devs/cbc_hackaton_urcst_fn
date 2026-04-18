import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentDialogContext } from "@/context/AppointmentDialogContext";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { User } from "lucide-react";
import { useState } from "react";

const ChangeAppointmentDoctor = () => {
  const { isOpen, setIsOpen, dialogType } = useAppointmentDialogContext();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  return (
    <Dialog
      open={isOpen && dialogType === "change-doctor"}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="sm:max-w-[33rem] p-8">
        <DialogHeader className="text-left mb-3">
          <DialogTitle>Change Assigned Doctor</DialogTitle>
          <DialogDescription>
            Select a new doctor to handle this appointment.
          </DialogDescription>
        </DialogHeader>
        <Table className="min-w-[25rem] ">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="pl-1 w-[5%]"></TableHead>
              <TableHead className="pl-1 w-[45%]">Name</TableHead>

              <TableHead>Today</TableHead>
              <TableHead>This week</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }, (_, index) => (
              <TableRow
                key={index}
                onClick={() => setSelectedDoctor(index)}
                className={`${
                  selectedDoctor === index && "!bg-green-500/15"
                } cursor-pointer !px-10`}
              >
                <TableCell>
                  <Input
                    type="radio"
                    checked={selectedDoctor === index}
                    name="doctor"
                    className="cursor-pointer bg-primary text-primary border-primary fil !size-4"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items- gap-1 ">
                    <div className="border border-muted-foreground/65 text-muted-foreground/65 size-7 rounded-full pt-1">
                      <User strokeWidth={1.3} className="size-full" />
                    </div>
                    <div>
                      <p className="leading-4">Dr.John Doe</p>
                      <p className="leading-4 text-muted-foreground/65 !text-[.8rem]">
                        General practitioner
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="">2 Slots</TableCell>
                <TableCell>7 Slots</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant={"ghost"} className="px-5 text-primary">
              Cancel
            </Button>
          </DialogClose>
          <Button className="px-5">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAppointmentDoctor;
