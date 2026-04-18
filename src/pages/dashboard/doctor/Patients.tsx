import { Input } from "@/components/ui/input";
import { useNavbarContext } from "@/context/NavbarContext";
import { CalendarDays, Mail, PhoneIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const mockPatients = Array.from({ length: 10 }, (_, i) => ({
  id: `patient_${i + 1}`,
  name: ["John Doe", "Jane Smith", "Alice Mugisha", "Bob Nkurunziza", "Carol Uwimana", "David Habimana", "Emma Ineza", "Frank Nsabimana", "Grace Uwineza", "Henry Bizimana"][i],
  email: `patient${i + 1}@example.com`,
  phone: "+250 788 808834",
  lastVisit: "June 10, 2025",
  condition: ["Hypertension", "Diabetes", "Cardiology Follow-up", "General Checkup", "Chest Pain", "Heart Failure", "Arrhythmia", "Lipid Management", "Preventive Care", "Post-op"][i % 10],
  status: i % 4 === 3 ? "inactive" : "active",
}));

const Patients = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("My Patients");
    setBreadcrumb(undefined);
    setActiveItem("My Patients");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return (
    <div className="size-full overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7">
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1 relative h-fit w-full max-w-[23rem]">
          <span className="absolute inset-y-0 my-auto ml-3 size-4">
            <Search className="!size-full" />
          </span>
          <Input
            type="text"
            placeholder="Name, Condition"
            className="!h-10 rounded-sm pl-8 focus-visible:border-black !ring-0 !bg-transparent"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {mockPatients.length} patients
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-x-5 gap-y-7">
        {mockPatients.map((patient) => (
          <div
            key={patient.id}
            className="group w-full max-w-80 shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 cursor-pointer"
          >
            <div className="relative bg-muted h-24">
              <figure className="absolute inset-0 mx-auto top-2/5 border border-gray-500 bg-white size-22 rounded-full overflow-hidden pt-4">
                <img src="/user-profile.png" alt="" className="opacity-90" />
              </figure>
            </div>
            <div className="flex flex-col items-center mt-10 gap-1 pb-4 px-3">
              <Link
                to={patient.id}
                className="font-medium hover:text-primary hover:underline text-center"
              >
                {patient.name}
              </Link>
              <p className="text-sm text-muted-foreground/90 text-center">
                {patient.condition}
              </p>
              <div className="flex items-center gap-1 text-[.85rem]">
                <PhoneIcon className="size-[.8rem]" />
                <a
                  href={`tel:${patient.phone}`}
                  target="_blank"
                  className="hover:underline hover:text-primary"
                >
                  {patient.phone}
                </a>
              </div>
              <div className="flex items-center gap-1 text-[.8rem] text-muted-foreground">
                <Mail className="size-[.8rem]" />
                <span className="truncate max-w-[10rem]">{patient.email}</span>
              </div>
              <div className="flex items-center gap-1 text-[.8rem] mt-1">
                <CalendarDays className="size-[.8rem] text-primary" />
                <span className="text-muted-foreground">Last visit: {patient.lastVisit}</span>
              </div>
              <div className="flex items-center text-[.85rem] mt-1">
                {patient.status === "active" ? (
                  <div className="flex items-center gap-1">
                    <span className="block rounded-full size-2.5 bg-green-500" />
                    <span>Active Patient</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="block rounded-full size-2.5 bg-gray-400" />
                    <span className="text-muted-foreground">Inactive</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
