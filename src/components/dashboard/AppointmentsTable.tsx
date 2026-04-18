import { Icon } from "@iconify/react/dist/iconify.js";
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

const AppointmentsTable = ({
  setIsBulkSelection,
  showRecent,
}: {
  setIsBulkSelection?: (value: boolean) => void;
  showRecent?: boolean;
}) => {
  const { setIsOpen, setDialogType } = useAppointmentDialogContext();
  const [selectedAppointment, setSelectedAppointment] = useState<
    Array<number> | "all" | null
  >();

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

  return (
    <Table className="min-w-[25rem]">
      <TableHeader className="">
        <TableRow className="">
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
          <TableHead>Patient Names</TableHead>
          {!showRecent && <TableHead>Doctor Assigned</TableHead>}
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          {!showRecent && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: showRecent ? 6 : 10 }, (_, index) => (
          <TableRow
            key={index}
            className={`${
              ((Array.isArray(selectedAppointment) &&
                selectedAppointment?.includes(index)) ||
                selectedAppointment === "all") &&
              "!bg-green-500/15"
            } `}
          >
            {!showRecent && (
              <TableCell>
                <Checkbox
                  className="cursor-pointer"
                  checked={
                    (Array.isArray(selectedAppointment) &&
                      selectedAppointment?.includes(index)) ||
                    selectedAppointment === "all"
                  }
                  onCheckedChange={(checked) =>
                    checked
                      ? setSelectedAppointment((prevData) => {
                          if (
                            Array.isArray(prevData) &&
                            !prevData.includes(index)
                          ) {
                            return [...prevData, index];
                          }
                          return [index];
                        })
                      : setSelectedAppointment((prevData) => {
                          if (
                            Array.isArray(prevData) &&
                            prevData.includes(index)
                          ) {
                            const tempIndex = prevData.indexOf(index);
                            if (tempIndex !== -1) {
                              prevData.splice(tempIndex, 1);
                            }
                            return [...prevData];
                          }
                          return prevData;
                        })
                  }
                />
              </TableCell>
            )}
            <TableCell>
              <div className="border-l border-black pl-1 text-[.8rem]">
                <p className="leading-4">12 Sept, 2025</p>
                <p>09:15 PM</p>
              </div>
            </TableCell>
            {!showRecent && (
              <TableCell className="text-[.8rem]">12 Sept, 2025</TableCell>
            )}
            <TableCell>John Doe</TableCell>
            {!showRecent && (
              <TableCell>
                <div className="flex gap-1">
                  <p>Dr.Shema Arnuad </p>
                  <Button
                    variant={"ghost"}
                    className="group h-fit !bg-transparent !p-0"
                    onClick={() => {
                      setDialogType("change-doctor");
                      setIsOpen(true);
                    }}
                    disabled={
                      selectedAppointment === "all" ||
                      !!selectedAppointment?.length
                    }
                  >
                    <Icon
                      icon="fluent-mdl2:user-sync"
                      width="18"
                      height="20"
                      className="text-primary  font-bold cursor-pointer stroke-primary  group-hover:stroke-[60]"
                    />
                  </Button>
                </div>
              </TableCell>
            )}
            <TableCell className="">Neurology</TableCell>
            <TableCell className="space-y-1">
              <AppointmentStatus
                status={
                  ["completed", "pending", "cancelled"][
                    Math.floor(Math.random() * 3)
                  ] as Status
                }
              />
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
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentsTable;
