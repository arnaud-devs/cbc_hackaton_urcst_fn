import AppointmentPayment from "@/components/Appointment/AppointmentPayment";
import DateAndTime from "@/components/Appointment/DateAndTime";
import PersonalInfo from "@/components/Appointment/PersonalInfo";
import Service from "@/components/Appointment/Service";
import Stepper from "@/components/Appointment/Stepper";
import { Button } from "@/components/ui/button";
import { useNavbarContext } from "@/context/NavbarContext";
import { Hospital } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Book = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Time", "Personal Info", "Service", "Done"];
  const [movedForward, setMovedForward] = useState(false);

  const { setActiveItem } = useNavbarContext();
  setActiveItem("Doctors");

  const navigate = useNavigate();

  return (
    <div className="max-w-[47rem] duration-300 sm:px-4 md:px-8 sm:overflow-hidden  mt-10 mb-20 space-y-10 mx-[8%] md:mx-auto">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          Book Appointment
        </h1>
        <h3 className="flex gap-1 sm:text-base text-muted-foreground">
          <span className="block size-5">
            <Hospital strokeWidth={1.5} className="size-full" />
          </span>
          CHUK Hospital
        </h3>
      </div>
      <Stepper
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        steps={steps}
      />
      <div className="py-1 sm:py-4 space-y-14 md:max-w-[35rem] mx-auto">
        {currentStep === 1 && <DateAndTime movedForward={movedForward} />}
        {currentStep === 2 && <PersonalInfo movedForward={movedForward} />}
        {currentStep === 3 && <Service movedForward={movedForward} />}
        {currentStep === 4 && (
          <AppointmentPayment movedForward={movedForward} />
        )}
        <div className="flex justify-between gap-2 sm:gap-3">
          <Button
            variant={"outline"}
            className="px-5 md:px-7 border border-destructive hover:bg-destructive/5 text-destructive"
            onClick={() => navigate("/clinics")}
          >
            Cancel
          </Button>
          <Button
            variant={"outline"}
            disabled={currentStep === 1}
            onClick={() => {
              setCurrentStep(currentStep - 1);
              setMovedForward(false);
            }}
            className="px-5 md:px-7 border-gray-600 hover:bg-gray-100 hover:border-black text-gray-600 hover:text-black ml-auto"
          >
            Back
          </Button>
          {currentStep < 4 && (
            <Button
              onClick={() => {
                if (currentStep < 4) setCurrentStep(currentStep + 1);
                setMovedForward(true);
              }}
              className="px-5 md:px-7 "
            >
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button
              onClick={() => {
                if (currentStep < 4) setCurrentStep(currentStep + 1);
                setMovedForward(true);
              }}
              className="px-5 md:px-12 "
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
