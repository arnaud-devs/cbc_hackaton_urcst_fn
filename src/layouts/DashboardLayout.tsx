import AppointmentDetails from "@/components/Appointment/AppointmentDetails";
import ChangeAppointmentDoctor from "@/components/Appointment/ChangeAppointmentDoctor";
import InformAppointmentReschedule from "@/components/Appointment/InformAppointmentCancellation";
import AppSidebar from "@/components/dashboard/AppSidebar";
import CustomBreadcrumb from "@/components/header/CustomBreadcrumb";
import DashNavBar from "@/components/header/DashNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppointmentDialogProvider } from "@/context/AppointmentDialogContext";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppointmentDialogProvider>
        <AppSidebar />
        <DashNavBar />
        <div className=" p-3 sm:p-7 xl:p-8 pt-20 sm:!pt-22 bg-[var(--dashboard-background)] w-full  overflow-hidden  ">
          <div className="max-w-[90rem] size-full mx-auto flex flex-col gap-y-10 ">
            <CustomBreadcrumb />
            <AppointmentDetails />
            <ChangeAppointmentDoctor />
            <InformAppointmentReschedule />
            <Outlet />
          </div>
        </div>
      </AppointmentDialogProvider>
    </SidebarProvider>
  );
};

export default DashboardLayout;
