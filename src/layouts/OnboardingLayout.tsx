import NavBar from "@/components/header/NavBar";
import { NavbarProvider } from "@/context/NavbarContext";
import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <div>
      <NavbarProvider>
        <NavBar />
      </NavbarProvider>
      <main className=" max-w-[90rem] mx-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default OnboardingLayout;
