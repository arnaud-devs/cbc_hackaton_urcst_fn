import { NavbarProvider } from "@/context/NavbarContext";
import Router from "@/routes/Router";
import { Toaster } from "@/components/ui/sonner";
import HealthChatBot from "@/components/chat/HealthChatBot";

const AppLayout = () => {
  return (
    <NavbarProvider>
      <Router />
      <Toaster />
      <HealthChatBot />
    </NavbarProvider>
  );
};

export default AppLayout;
