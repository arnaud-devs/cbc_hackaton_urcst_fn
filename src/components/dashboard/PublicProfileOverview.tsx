import { PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useNavbarContext } from "@/context/NavbarContext";

const PublicProfileOverview = () => {
  const [editMode, setEditMode] = useState<Array<
    "contact" | "address" | "aboutUs" | "services" | "workingHours"
  > | null>(null);

  const { setBreadcrumb } = useNavbarContext();

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Profile",
    });
  }, [setBreadcrumb]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <figure className="bg-muted/60 size-28 md:size-[10rem] border rounded-md overflow-hidden "></figure>
        <h2 className="text-2xl md:text-3xl font-medium">CHUK Hospital</h2>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-12"
      >
        <div className="sm:col-start-1 space-y-12">
          <div className="space-y-4">
            <h5 className="flex items-center gap-x-3 font-medium text-lg">
              <span>Contact information</span>
              {editMode && editMode.includes("contact") ? (
                <Trash2
                  onClick={() => setEditMode(null)}
                  strokeWidth={1.5}
                  className="text-muted-foreground size-5 cursor-pointer hover:text-destructive"
                />
              ) : (
                <PencilLine
                  strokeWidth={1.5}
                  onClick={() =>
                    setEditMode((prevData) => {
                      if (prevData) {
                        return Array.from(new Set([...prevData, "contact"]));
                      } else {
                        return ["contact"];
                      }
                    })
                  }
                  className="text-muted-foreground size-5 cursor-pointer hover:text-primary"
                />
              )}
            </h5>
            <div className="space-y-2 max-w-90">
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Email
                </span>
                <Input
                  type="email"
                  placeholder="Email"
                  value={"example@gmail.com"}
                  readOnly={editMode === null || !editMode.includes("contact")}
                  className={`${
                    editMode === null || !editMode.includes("contact")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Telephone
                </span>
                <Input
                  type="email"
                  placeholder="Phone number"
                  value="0788811100"
                  readOnly={editMode === null || !editMode.includes("contact")}
                  className={`${
                    editMode === null || !editMode.includes("contact")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Toll free
                </span>
                <Input
                  type="text"
                  placeholder="Toll free"
                  value="3322"
                  readOnly={editMode === null || !editMode.includes("contact")}
                  className={`${
                    editMode === null || !editMode.includes("contact")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Website
                </span>
                <Input
                  type="email"
                  placeholder="Email"
                  value={"www.chukhospital.com"}
                  readOnly={editMode === null || !editMode.includes("contact")}
                  className={`${
                    editMode === null || !editMode.includes("contact")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="flex items-center gap-x-3 font-medium text-lg">
              <span>Address</span>
              {editMode && editMode.includes("address") ? (
                <Trash2
                  onClick={() => setEditMode(null)}
                  strokeWidth={1.5}
                  className="text-muted-foreground size-5 cursor-pointer hover:text-destructive"
                />
              ) : (
                <PencilLine
                  strokeWidth={1.5}
                  onClick={() =>
                    setEditMode((prevData) => {
                      if (prevData) {
                        return Array.from(new Set([...prevData, "address"]));
                      } else {
                        return ["address"];
                      }
                    })
                  }
                  className="text-muted-foreground size-5 cursor-pointer hover:text-primary"
                />
              )}
            </h5>
            <div className="grid grid-cols-2 space-y-2 gap-x-4 max-w-90">
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Province
                </span>
                <Input
                  type="text"
                  placeholder="Province"
                  value={"Kigali City"}
                  readOnly={editMode === null || !editMode.includes("address")}
                  className={`${
                    editMode === null || !editMode.includes("address")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  District
                </span>
                <Input
                  type="text"
                  placeholder="District"
                  value="Nyarugenge"
                  readOnly={editMode === null || !editMode.includes("address")}
                  className={`${
                    editMode === null || !editMode.includes("address")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Sector
                </span>
                <Input
                  type="text"
                  placeholder="Sector"
                  value="Muhima"
                  readOnly={editMode === null || !editMode.includes("address")}
                  className={`${
                    editMode === null || !editMode.includes("address")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Village
                </span>
                <Input
                  type="text"
                  placeholder="Village"
                  value={"Kiyovu"}
                  readOnly={editMode === null || !editMode.includes("address")}
                  className={`${
                    editMode === null || !editMode.includes("address")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-start-2 space-y-12">
          <div className="space-y-4">
            <h5 className="flex items-center gap-x-3 font-medium text-lg">
              <span>Working hours</span>
              {editMode && editMode.includes("workingHours") ? (
                <Trash2
                  onClick={() => setEditMode(null)}
                  strokeWidth={1.5}
                  className="text-muted-foreground size-5 cursor-pointer hover:text-destructive"
                />
              ) : (
                <PencilLine
                  strokeWidth={1.5}
                  onClick={() =>
                    setEditMode((prevData) => {
                      if (prevData) {
                        return Array.from(
                          new Set([...prevData, "workingHours"])
                        );
                      } else {
                        return ["workingHours"];
                      }
                    })
                  }
                  className="text-muted-foreground size-5 cursor-pointer hover:text-primary"
                />
              )}
            </h5>
            <div className="grid space-y-2 max-w-90">
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Monday - Friday
                </span>
                <Input
                  type="text"
                  placeholder="Province"
                  value={"08h:00 - 18h:00"}
                  readOnly={
                    editMode === null || !editMode.includes("workingHours")
                  }
                  className={`${
                    editMode === null || !editMode.includes("workingHours")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
              <div className="relative ">
                <span className="block text-muted-foreground/65 font-normal">
                  Saturday - Sunday
                </span>
                <Input
                  type="text"
                  placeholder="Province"
                  value={"08h:00 - 15h:00"}
                  readOnly={
                    editMode === null || !editMode.includes("workingHours")
                  }
                  className={`${
                    editMode === null || !editMode.includes("workingHours")
                      ? "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                      : "!h-10 font-normal"
                  } !text-base block`}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="flex items-center gap-x-3 font-medium text-lg">
              <span>About us</span>
              {editMode && editMode.includes("aboutUs") ? (
                <Trash2
                  onClick={() => setEditMode(null)}
                  strokeWidth={1.5}
                  className="text-muted-foreground size-5 cursor-pointer hover:text-destructive"
                />
              ) : (
                <PencilLine
                  strokeWidth={1.5}
                  onClick={() =>
                    setEditMode((prevData) => {
                      if (prevData) {
                        return Array.from(new Set([...prevData, "aboutUs"]));
                      } else {
                        return ["aboutUs"];
                      }
                    })
                  }
                  className="text-muted-foreground size-5 cursor-pointer hover:text-primary"
                />
              )}
            </h5>
            <Textarea
              className={`${
                editMode === null || !editMode.includes("aboutUs")
                  ? "line-clamp-4 border-none  shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1"
                  : ""
              } !text-base duration-700`}
              value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, facere! Non exercitationem nesciunt ut aliquam, inventore est esse illo incidunt animi sint dolores reiciendis dolorem rem deleniti asperiores pariatur? Temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, facere! Non exercitationem nesciunt ut aliquam, inventore est esse illo incidunt animi sint dolores reiciendis dolorem rem deleniti asperiores pariatur? Temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, facere! Non exercitationem nesciunt ut aliquam, inventore est esse illo incidunt animi sint dolores reiciendis dolorem rem deleniti asperiores pariatur? Temporibus."
            />
          </div>
        </div>
        {editMode !== null && (
          <div className="flex gap-3">
            <Button variant={"outline"} type="reset">
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PublicProfileOverview;
