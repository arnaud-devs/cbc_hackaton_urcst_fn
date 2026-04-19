import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CalendarSync, Eye } from "lucide-react";
import { useAppointmentDialogContext } from "@/context/AppointmentDialogContext";
import AppointmentStatus, {
  type Status,
} from "../Appointment/AppointmentStatus";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://cbc-hackaton-urcst-bn.onrender.com/api";

interface Booking {
  id: string;
  serviceId: string;
  doctorId: string;
  clientPhone: string;
  clientAge: number;
  clientSex: string;
  clientLanguage: string;
  clientAddress: string;
  clientDetail: string;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: string;
  service: { name: string };
  doctor: { name: string; specialty: string };
}

function normalizeStatus(s: string): Status {
  const lower = s.toLowerCase();
  if (lower === "completed") return "completed";
  if (lower === "cancelled") return "cancelled";
  return "pending";
}

const AppointmentsTable = ({
  setIsBulkSelection,
  showRecent,
  apiPath,
}: {
  setIsBulkSelection?: (value: boolean) => void;
  showRecent?: boolean;
  apiPath?: string;
}) => {
  const { setIsOpen, setDialogType } = useAppointmentDialogContext();
  const [selectedAppointment, setSelectedAppointment] = useState<
    Array<string> | "all" | null
  >();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/${apiPath ?? "admin/bookings"}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setBookings(Array.isArray(json.data) ? json.data : []);
        } else {
          setFetchError(json.message ?? "Failed to load appointments.");
        }
      })
      .catch(() => setFetchError("Network error. Could not load appointments."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (
      (selectedAppointment === "all" || selectedAppointment?.length) &&
      setIsBulkSelection
    ) {
      setIsBulkSelection(true);
    } else if (setIsBulkSelection) {
      setIsBulkSelection(false);
    }
  }, [selectedAppointment, setIsBulkSelection]);

  const rows = showRecent ? bookings.slice(0, 6) : bookings;

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground text-sm">
        Loading appointments…
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-3">
        {fetchError}
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground text-sm">
        No appointments found.
      </div>
    );
  }

  return (
    <Table className="min-w-[25rem]">
      <TableHeader>
        <TableRow>
          {!showRecent && (
            <TableHead className="px-2">
              <Checkbox
                className="cursor-pointer"
                onCheckedChange={(checked) =>
                  checked
                    ? setSelectedAppointment("all")
                    : setSelectedAppointment(null)
                }
              />
            </TableHead>
          )}
          <TableHead className="px-2">Appointment Date</TableHead>
          {!showRecent && <TableHead>Booked On</TableHead>}
          <TableHead>Patient</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          {!showRecent && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((booking) => {
          const isSelected =
            selectedAppointment === "all" ||
            (Array.isArray(selectedAppointment) &&
              selectedAppointment.includes(booking.id));

          return (
            <TableRow key={booking.id} className={isSelected ? "!bg-green-500/15" : ""}>
              {!showRecent && (
                <TableCell>
                  <Checkbox
                    className="cursor-pointer"
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      checked
                        ? setSelectedAppointment((prev) => {
                            if (Array.isArray(prev)) return [...prev, booking.id];
                            return [booking.id];
                          })
                        : setSelectedAppointment((prev) => {
                            if (Array.isArray(prev))
                              return prev.filter((id) => id !== booking.id);
                            return prev;
                          })
                    }
                  />
                </TableCell>
              )}
              <TableCell>
                <div className="border-l border-black pl-1 text-[.8rem]">
                  <p className="leading-4">
                    {booking.date ? format(new Date(booking.date), "dd MMM, yyyy") : "—"}
                  </p>
                  <p>{booking.timeSlot}</p>
                </div>
              </TableCell>
              {!showRecent && (
                <TableCell className="text-[.8rem]">
                  {booking.createdAt ? format(new Date(booking.createdAt), "dd MMM, yyyy") : "—"}
                </TableCell>
              )}
              <TableCell>
                <div className="text-[.85rem]">
                  <p>{booking.clientDetail || booking.clientPhone}</p>
                  <p className="text-muted-foreground text-xs">{booking.clientPhone}</p>
                </div>
              </TableCell>
              <TableCell>{booking.service?.name ?? "—"}</TableCell>
              <TableCell>
                <AppointmentStatus status={normalizeStatus(booking.status)} />
              </TableCell>
              {!showRecent && (
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setDialogType("details");
                        setIsOpen(true);
                      }}
                      className="block size-[26px] !bg-gray-200 hover:bg-gray-300 cursor-pointer rounded !p-[5px]"
                      disabled={
                        selectedAppointment === "all" ||
                        !!selectedAppointment?.length
                      }
                    >
                      <Eye strokeWidth={1.5} className="size-full" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setDialogType("cancellation");
                        setIsOpen(true);
                      }}
                      disabled={
                        selectedAppointment === "all" ||
                        !!selectedAppointment?.length
                      }
                      className="block size-[26px] !bg-gray-200 hover:bg-gray-300 cursor-pointer rounded !p-[5px]"
                    >
                      <CalendarSync strokeWidth={1.5} className="size-full" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AppointmentsTable;
