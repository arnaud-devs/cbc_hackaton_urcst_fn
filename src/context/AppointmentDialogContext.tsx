import React, { useContext, useState, type ReactNode } from "react";

interface AppointmentDialogContextType {
  dialogType:
    | "details"
    | "change-doctor"
    | "cancellation"
    | "bulk-cancellation";
  setDialogType: (
    value: "details" | "change-doctor" | "cancellation" | "bulk-cancellation"
  ) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AppointmentDialogContext = React.createContext<
  AppointmentDialogContextType | undefined
>(undefined);

export const AppointmentDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "details" | "change-doctor" | "cancellation" | "bulk-cancellation"
  >("details");

  return (
    <AppointmentDialogContext.Provider
      value={{ isOpen, setIsOpen, dialogType, setDialogType }}
    >
      {children}
    </AppointmentDialogContext.Provider>
  );
};

export const useAppointmentDialogContext = (): AppointmentDialogContextType => {
  const context = useContext(AppointmentDialogContext);
  if (!context) {
    throw new Error(
      "useAppointmentDialogContext must be used within a AppointmentDialogProvider"
    );
  }
  return context;
};
