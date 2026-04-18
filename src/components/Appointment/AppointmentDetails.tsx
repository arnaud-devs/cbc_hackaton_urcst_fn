import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentDialogContext } from "@/context/AppointmentDialogContext";
import AppointmentStatus from "./AppointmentStatus";

const AppointmentDetails = () => {
  const { isOpen, setIsOpen, dialogType } = useAppointmentDialogContext();

  return (
    <Dialog open={isOpen && dialogType === "details"} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[33rem] p-8 space-y-4 sm:space-y-6">
        <DialogHeader className="text-left">
          <DialogTitle>Patient Appointment Details</DialogTitle>
          <DialogDescription>
            Review the information below for this appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 ">
          <div className="">
            <h5 className="text-muted-foreground/70 text-[.85rem]">
              Patient Name
            </h5>
            <p className="text-[.95rem] font-normal">Shema Cyubahiro Arnuard</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">
                Department
              </h5>
              <p className="text-[.95rem] font-normal leading-4">Neurology</p>
            </div>
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">Status</h5>
              <AppointmentStatus status="pending" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">
                Insurance
              </h5>
              <p className="text-[.95rem] font-normal leading-4">Radiant</p>
            </div>
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">
                Date and Time
              </h5>
              <p className="text-[.95rem] font-normal leading-4">
                09 Sept 2023 - 09:13AM
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">
                Doctor assigned to
              </h5>
              <p className="text-[.95rem] font-normal leading-4">
                Dr.Shema Cyubahiro Arnuard
              </p>
            </div>
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">Gender</h5>
              <p className="text-[.95rem] font-normal leading-4">Male</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1/2 ">
              <h5 className="text-muted-foreground/70 text-[.85rem]">Email</h5>
              <p className="text-[.95rem] font-normal leading-4">
                shemaarnaud69@gmail.com
              </p>
            </div>
            <div className="flex-1/2">
              <h5 className="text-muted-foreground/70 text-[.85rem]">
                Telephone
              </h5>
              <p className="text-[.95rem] font-normal leading-4">0790889871</p>
            </div>
          </div>
          <div className="">
            <h5 className="text-muted-foreground/70 text-[.85rem]">
              Additional Patient Info
            </h5>
            <p className="text-[.95rem] font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              ut impedit magni, asperiores dolores repellendus neque! Rem, vero
              repellat officiis tempora dicta, facere fugit cumque at animi
              illum quibusdam architecto?
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;
