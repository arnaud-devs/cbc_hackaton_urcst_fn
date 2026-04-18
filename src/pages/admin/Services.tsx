import { useEffect } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import ServicesPage from "@/pages/dashboard/clinic/Services";

const AdminServices = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("Services");
    setBreadcrumb(undefined);
    setActiveItem("Services");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return <ServicesPage />;
};

export default AdminServices;
