import { useEffect, useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { CalendarCheck, Users, BookOpen, Stethoscope } from "lucide-react";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface StatCard {
  label: string;
  count: number;
  sub: string;
  link: string;
  icon: React.ReactNode;
  accent: string;
}

const AdminOverview = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  const [doctorCount, setDoctorCount] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    setBreadcrumb(undefined);
    setActiveItem("Overview");
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.name) setAdminName(user.name);
      } catch {}
    }
    setDashTitle("Dashboard");
  }, [setBreadcrumb, setActiveItem, setDashTitle]);

  useEffect(() => {
    const headers = authHeaders();
    Promise.allSettled([
      fetch(`${API_BASE}/admin/doctors`, { headers }).then((r) => r.json()),
      fetch(`${API_BASE}/admin/bookings`, { headers }).then((r) => r.json()),
      fetch(`${API_BASE}/admin/articles`, { headers }).then((r) => r.json()),
      fetch(`${API_BASE}/admin/services`, { headers }).then((r) => r.json()),
    ]).then(([doctors, bookings, articles, services]) => {
      if (doctors.status === "fulfilled" && doctors.value.data)
        setDoctorCount(doctors.value.data.length);
      if (bookings.status === "fulfilled" && bookings.value.data)
        setBookingCount(bookings.value.data.length);
      if (articles.status === "fulfilled" && articles.value.data)
        setArticleCount(articles.value.data.length);
      if (services.status === "fulfilled" && services.value.data)
        setServiceCount(services.value.data.length);
    });
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const stats: StatCard[] = [
    {
      label: "Doctors",
      count: doctorCount ?? 0,
      sub: "Registered",
      link: "/admin/doctors",
      icon: <Users className="!size-full" />,
      accent: "bg-purple-700/15 text-purple-700",
    },
    {
      label: "Bookings",
      count: bookingCount ?? 0,
      sub: "Total bookings",
      link: "/admin/bookings",
      icon: <CalendarCheck className="!size-full" />,
      accent: "bg-yellow-500/20 text-yellow-600",
    },
    {
      label: "Articles",
      count: articleCount ?? 0,
      sub: "Published",
      link: "/admin/articles",
      icon: <BookOpen className="!size-full" />,
      accent: "bg-blue-500/15 text-blue-600",
    },
    {
      label: "Services",
      count: serviceCount ?? 0,
      sub: "Active services",
      link: "/admin/services",
      icon: <Stethoscope className="!size-full" />,
      accent: "bg-primary/15 text-primary",
    },
  ];

  return (
    <div className="flex-1 flex h-fit flex-col gap-3 md:gap-4">
      <h2 className="text-xl font-semibold text-muted-foreground">
        {greeting()}, {adminName}
      </h2>

      {/* Stat cards */}
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-3 md:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col min-w-[13rem] bg-white flex-1 h-44 lg:h-48 rounded-md shadow-xl/5"
          >
            <Link
              to={s.link}
              className="cursor-pointer hover:text-primary group flex items-center gap-2 border-b mx-2 h-14 xl:h-16 px-4"
            >
              <div className={`${s.accent} size-7 p-1 rounded-sm`}>{s.icon}</div>
              <h3 className="font-medium group-hover:underline">{s.label}</h3>
              <FaArrowRight className="group-hover:animate-bounce-x ml-auto" />
            </Link>
            <div className="pl-10 my-auto space-y-1">
              <p className="font-medium text-4xl lg:text-5xl">
                {s.count ?? "—"}
              </p>
              <p className="text-[.9rem] text-muted-foreground/90">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="w-full overflow-hidden space-y-6 bg-background rounded-md shadow-xl/5 p-5 sm:p-8 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Recent Bookings</h3>
          <Link to="/admin/bookings" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <AppointmentsTable showRecent />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
