import DateAndTime from "@/components/Appointment/DateAndTime";
import PersonalInfo from "@/components/Appointment/PersonalInfo";
import type { PersonalData } from "@/components/Appointment/PersonalInfo";
import Service from "@/components/Appointment/Service";
import type { ServiceItem } from "@/components/Appointment/Service";
import Stepper from "@/components/Appointment/Stepper";
import { Button } from "@/components/ui/button";
import { useNavbarContext } from "@/context/NavbarContext";
import { CheckCircle, Loader2, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const Book = () => {
  const { id: doctorId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setActiveItem } = useNavbarContext();
  setActiveItem("Doctors");

  const steps = ["Date & Time", "Personal Info", "Service", "Confirm"];
  const [currentStep, setCurrentStep] = useState(1);
  const [movedForward, setMovedForward] = useState(false);

  // Step 1 — Date & Time
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState("");

  // Step 2 — Personal info
  const [personal, setPersonal] = useState<PersonalData>({
    clientPhone: "",
    clientAge: "",
    clientSex: "male",
    clientLanguage: "",
    clientAddress: "",
  });

  // Step 3 — Service
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState("");
  const [clientDetail, setClientDetail] = useState("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") setServices(json.data);
        else setServicesError(json.message ?? "Failed to load services.");
      })
      .catch(() => setServicesError("Could not load services. Please try again."))
      .finally(() => setServicesLoading(false));
  }, []);

  const handleNext = () => {
    setError(null);
    if (currentStep === 1) {
      if (!date || !timeSlot) { setError("Please select a date and time slot."); return; }
    }
    if (currentStep === 2) {
      if (!personal.clientPhone || !personal.clientAge || !personal.clientLanguage || !personal.clientAddress) {
        setError("Please fill in all required fields."); return;
      }
    }
    if (currentStep === 3) {
      if (!serviceId) { setError("Please select a service."); return; }
    }
    setCurrentStep((s) => s + 1);
    setMovedForward(true);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!date || !timeSlot) { setError("Please select a date and time slot."); return; }
    if (!personal.clientPhone || !personal.clientAge || !personal.clientLanguage || !personal.clientAddress) {
      setError("Please fill in all required personal info fields."); return;
    }
    if (!serviceId) { setError("Please select a service."); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          doctorId,
          clientPhone: personal.clientPhone,
          clientAge: Number(personal.clientAge),
          clientSex: personal.clientSex,
          clientLanguage: personal.clientLanguage,
          clientAddress: personal.clientAddress,
          clientDetail,
          date: format(date!, "yyyy-MM-dd"),
          timeSlot,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.details?.join(", ") ?? json.message ?? "Booking failed.");
        return;
      }
      setBookingId(json.data.id);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (bookingId) {
    return (
      <div className="max-w-[47rem] mt-10 mb-20 mx-[8%] md:mx-auto flex flex-col items-center text-center gap-6 py-16">
        <CheckCircle className="size-16 text-green-500" />
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl md:text-3xl">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your appointment has been successfully booked.</p>
        </div>
        <div className="bg-muted rounded-lg px-8 py-5 space-y-1">
          <p className="text-sm text-muted-foreground">Your Booking ID</p>
          <p className="text-3xl font-bold tracking-widest text-primary">{bookingId}</p>
          <p className="text-xs text-muted-foreground mt-1">Save this ID to check your booking status.</p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>{format(date!, "EEEE, MMMM d yyyy")} at {timeSlot}</p>
        </div>
        <Button onClick={() => navigate("/doctors")} className="mt-2 px-8">
          Back to Doctors
        </Button>
      </div>
    );
  }

  const selectedService = services.find((s) => s.id === serviceId);

  return (
    <div className="max-w-[47rem] duration-300 sm:px-4 md:px-8 sm:overflow-hidden mt-10 mb-20 space-y-10 mx-[8%] md:mx-auto">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">Book Appointment</h1>
        <h3 className="flex gap-1 sm:text-base text-muted-foreground">
          <Stethoscope strokeWidth={1.5} className="size-5" />
          Doctor Appointment
        </h3>
      </div>
      <Stepper setCurrentStep={setCurrentStep} currentStep={currentStep} steps={steps} />
      <div className="py-1 sm:py-4 space-y-8 md:max-w-[35rem] mx-auto">
        {currentStep === 1 && (
          <DateAndTime
            movedForward={movedForward}
            date={date}
            timeSlot={timeSlot}
            onChange={(field, value) => {
              if (field === "date") setDate(value as Date);
              else setTimeSlot(value as string);
            }}
          />
        )}
        {currentStep === 2 && (
          <PersonalInfo
            movedForward={movedForward}
            data={personal}
            onChange={(field, value) => setPersonal((p) => ({ ...p, [field]: value }))}
          />
        )}
        {currentStep === 3 && (
          <>
            {servicesLoading && (
              <p className="text-sm text-muted-foreground">Loading services…</p>
            )}
            {servicesError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {servicesError}
              </div>
            )}
            <Service
              movedForward={movedForward}
              serviceId={serviceId}
              clientDetail={clientDetail}
              services={services}
              onChange={(field, value) => {
                if (field === "serviceId") setServiceId(value);
                else setClientDetail(value);
              }}
            />
          </>
        )}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="font-medium text-lg md:text-xl">Confirm Booking</h2>
            <div className="border rounded-lg divide-y text-sm">
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{date ? format(date, "MMM d, yyyy") : "—"}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{timeSlot}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{personal.clientPhone}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Age / Sex</span>
                <span className="font-medium">{personal.clientAge} · {personal.clientSex}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Language</span>
                <span className="font-medium">{personal.clientLanguage}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium">{personal.clientAddress}</span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{selectedService?.name ?? "—"}</span>
              </div>
              {clientDetail && (
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">Notes</span>
                  <span className="font-medium max-w-[60%] text-right">{clientDetail}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex justify-between gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="px-5 md:px-7 border-destructive hover:bg-destructive/5 text-destructive"
            onClick={() => navigate("/doctors")}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => { setCurrentStep((s) => s - 1); setMovedForward(false); setError(null); }}
            className="px-5 md:px-7 border-gray-600 hover:bg-gray-100 text-gray-600 hover:text-black ml-auto"
          >
            Back
          </Button>
          {currentStep < 4 && (
            <Button onClick={handleNext} className="px-5 md:px-7">Next</Button>
          )}
          {currentStep === 4 && (
            <Button onClick={handleSubmit} disabled={submitting} className="px-5 md:px-10">
              {submitting ? <><Loader2 className="size-4 mr-2 animate-spin" />Booking…</> : "Confirm Booking"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
