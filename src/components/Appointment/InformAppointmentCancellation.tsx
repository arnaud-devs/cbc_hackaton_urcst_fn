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
import { User } from "lucide-react";
import { Textarea } from "../ui/textarea";

const InformAppointmentCancellation = () => {
  const { isOpen, setIsOpen, dialogType } = useAppointmentDialogContext();

  return (
    <Dialog
      open={
        isOpen &&
        (dialogType === "bulk-cancellation" || dialogType === "cancellation")
      }
      onOpenChange={setIsOpen}
    >
      <DialogContent className="sm:max-w-[33rem] px-4 py-8 sm:p-8">
        <DialogHeader className="text-left sm:mb-3">
          <DialogTitle>Appointment Cancellation Notice</DialogTitle>
          <DialogDescription>
            Notify the patients about this appointment change.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-5 ">
          {dialogType === "cancellation" && (
            <>
              <div>
                <h5 className=" font-medium ">Patient Info</h5>
                <div className="text-[.9rem] pl2 space-y-1">
                  <p className="">Name: Shema Cyubahiro Arnuard</p>
                  <p className="">Email: shemaarnaud69@gmail.com</p>
                  <p className="">Telephone: 0790889871</p>
                </div>
              </div>
              <div>
                <h5 className=" font-medium ">Appointment</h5>
                <div className="text-[.9rem] pl2 space-y-1 ">
                  <p className="">Department: Neurology</p>
                  <p className="">Date: 09 Sept 2023 - 09:13AM</p>
                </div>
              </div>
              <div>
                <h5 className="font-medium">Assigned Doctor</h5>
                <div className="flex gap-1 ">
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
              </div>
            </>
          )}
          {dialogType === "bulk-cancellation" && (
            <>
              <div>
                <h5 className=" font-medium ">Bulk Cancellation</h5>
                <div className="text-[.9rem] pl2 space-y-1">
                  15 Appointments Selected
                </div>
              </div>
            </>
          )}

          <div className="">
            <h5 className="font-medium">Reason for Cancellation</h5>
            <Textarea
              name=""
              id=""
              className="rounded min-h-25 !ring-0 focus-visible:border-black"
            ></Textarea>
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant={"ghost"} className="px-5 text-primary">
              Dismiss
            </Button>
          </DialogClose>
          <Button className="px-5">Confirm & Inform</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InformAppointmentCancellation;
