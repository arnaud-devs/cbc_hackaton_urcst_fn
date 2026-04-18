import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Blog from "@/pages/blogs/Blog";
import Blogs from "@/pages/blogs/Blogs";
import ManageArticles from "@/pages/blogs/ManageArticles";
import Home from "@/pages/home/Home";
import Clinic from "@/pages/clinics/Clinic";
import Clinics from "@/pages/clinics/Clinics";
import OnBoard from "@/pages/onBoard/OnBoard";
import { Navigate, Route, Routes } from "react-router-dom";
import { Book } from "@/pages/clinics/Book";
import OnboardLayout from "@/layouts/OnboardingLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Overview from "@/pages/dashboard/clinic/Overview";
import Appointments from "@/pages/dashboard/clinic/Appointments";
import Schedules from "@/pages/dashboard/clinic/Schedules";
import Doctors from "@/pages/dashboard/clinic/Doctors";
import Doctor from "@/pages/dashboard/clinic/Doctor";
import PublicProfile from "@/pages/dashboard/clinic/PublicProfile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth">
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<AuthLayout showIllustration={false} />}>
          <Route path="verify-otp" element={<VerifyOtp />} />
        </Route>
      </Route>
      <Route path="/health" element={<MainLayout />}>
        <Route index element={<Blogs />} />
        <Route path=":id" element={<Blog />} />
        <Route path="manage" element={<ManageArticles />} />
      </Route>
      <Route path="/clinics" element={<MainLayout />}>
        <Route index element={<Clinics />} />
        <Route path=":id" element={<Clinic />} />
      </Route>
      <Route path="/book" element={<MainLayout />}>
        <Route index element={<Navigate to="/clinics" replace />} />
        <Route path=":id" element={<Book />} />
      </Route>
      <Route path="/onboard" element={<OnboardLayout />}>
        <Route index element={<OnBoard />} />
      </Route>
      {/* Dashboard Routes */}
      {/* Administrator Routes */}

      {/* Clinic Routes */}
      <Route path="/clinic" element={<DashboardLayout />}>
        {/* <Route index element={<Navigate to="/overview" replace />} /> */}
        <Route path="overview" element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="doctors">
          <Route index element={<Doctors />} />
          <Route path=":id" element={<Doctor />} />
        </Route>
        <Route path="public" element={<PublicProfile />} />
      </Route>
    </Routes>
  );
};

export default Router;
