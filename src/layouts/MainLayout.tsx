import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
        <NavBar />
      <main className=" max-w-[90rem] mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
