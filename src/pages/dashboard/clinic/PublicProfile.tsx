import { useSidebar } from "@/components/ui/sidebar";
import { useNavbarContext } from "@/context/NavbarContext";
import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicProfileOverview from "@/components/dashboard/PublicProfileOverview";
import PublicReviews from "@/components/dashboard/PublicReviews";
import Gallery from "@/components/dashboard/Gallery";
import PublicServices from "@/components/dashboard/PublicServices";

const PublicProfile = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  useEffect(() => {
    setDashTitle("Public Profile");
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Profile",
    });
    setActiveItem("My Profile");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Tabs defaultValue="profile" className="gap-4">
        <TabsList className="gap-2 size-full bg-background rounded-md shadow-lg p-0 h-10 md:h-12">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/15 !w-fit"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/15 !w-fit"
          >
            Services
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/15 !w-fit"
          >
            Reviews
          </TabsTrigger>

          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/15 !w-fit"
          >
            Gallery
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="size-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-4 xs:p-7 sm:p-10 md:p-14">
            <PublicProfileOverview />
          </div>
        </TabsContent>
        <TabsContent value="services">
          <div className="size-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-5 sm:p-10 md:p-14">
            <PublicServices />
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="size-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-5 sm:p-10 md:p-14">
            <PublicReviews />
          </div>
        </TabsContent>
        <TabsContent value="gallery">
          <div className="size-full overflow-hidden  space-y-7 bg-background rounded-md shadow-xl/5 p-5 sm:p-10 md:p-14">
            <Gallery />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicProfile;
