import { NavbarProvider } from "@/context/NavbarContext";
import Router from "@/routes/Router";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <NavbarProvider>
      <Router />
      <Toaster />
    </NavbarProvider>
  );
};

export default AppLayout;
