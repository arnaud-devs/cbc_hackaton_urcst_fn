import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Blog from "@/pages/blogs/Blog";
import Blogs from "@/pages/blogs/Blogs";
import ManageArticles from "@/pages/blogs/ManageArticles";
import Home from "@/pages/home/Home";
import DoctorsListing from "@/pages/doctors/DoctorsListing";
import DoctorPage from "@/pages/doctors/DoctorPage";
import OnBoard from "@/pages/onBoard/OnBoard";
import { Navigate, Route, Routes } from "react-router-dom";
import { Book } from "@/pages/clinics/Book";
import OnboardLayout from "@/layouts/OnboardingLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Overview from "@/pages/dashboard/clinic/Overview";
import Appointments from "@/pages/dashboard/clinic/Appointments";
import Schedules from "@/pages/dashboard/clinic/Schedules";
import Patients from "@/pages/dashboard/doctor/Patients";
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
      {/* Public doctor discovery routes */}
      <Route path="/doctors" element={<MainLayout />}>
        <Route index element={<DoctorsListing />} />
        <Route path=":id" element={<DoctorPage />} />
      </Route>
      <Route path="/book" element={<MainLayout />}>
        <Route index element={<Navigate to="/doctors" replace />} />
        <Route path=":id" element={<Book />} />
      </Route>
      <Route path="/onboard" element={<OnboardLayout />}>
        <Route index element={<OnBoard />} />
      </Route>
      {/* Doctor Dashboard Routes */}
      <Route path="/doctor" element={<DashboardLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="patients" element={<Patients />} />
        <Route path="profile" element={<PublicProfile />} />
      </Route>
    </Routes>
  );
};

export default Router;
