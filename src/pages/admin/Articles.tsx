import { useEffect } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import ManageArticles from "@/pages/blogs/ManageArticles";

const AdminArticles = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("Articles");
    setBreadcrumb(undefined);
    setActiveItem("Articles");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return <ManageArticles />;
};

export default AdminArticles;
