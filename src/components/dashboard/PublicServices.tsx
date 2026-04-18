import { useNavbarContext } from "@/context/NavbarContext";
import { PencilLine, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Switch } from "@/components/ui/switch";
import UpsertService from "./UpsertService";

const PublicServices = () => {
  const { setBreadcrumb } = useNavbarContext();

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Services",
    });
  }, [setBreadcrumb]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"new" | "edit">("new");

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center gap-x-4">
          <h5 className="flex items-center gap-x-1 text-xl md:text-2xl font-medium">
            Services
          </h5>
          <PlusCircle
            strokeWidth={1.5}
            onClick={() => {
              setOpen(true);
              setMode("new");
            }}
            className="cursor-pointer hover:text-primary hover:fill-primary/10"
          />
        </div>
        <div className=" space-y-5">
          {Array.from({ length: 6 }, (_, index) => (
            <>
              <div key={index} className="relative space-y-2">
                <div className="">
                  <div className="flex items-center gap-x-3 font-medium">
                    <p className="font-medium">Neurology</p>
                    <PencilLine
                      strokeWidth={1.5}
                      onClick={() => {
                        setOpen(true);
                        setMode("edit");
                      }}
                      className="text-muted-foreground size-4.5 cursor-pointer hover:text-primary"
                    />
                    <Switch
                      id={"service" + index}
                      checked
                      title="Deactivate"
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-sm -mt-0.5">
                    &nbsp;-&nbsp;Approx. 30 minutes
                  </p>
                </div>
                <span className="text-muted-foreground/70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  consequuntur inventore sint odit molestiae reprehenderit
                  itaque voluptate debitis dolorum, minima ea recusandae dicta
                  atque? Inventore consequatur distinctio autem magni quidem.
                </span>
              </div>
              <Separator />
            </>
          ))}
        </div>
      </div>
      <UpsertService mode={mode} open={open} setOpen={setOpen} />
    </>
  );
};

export default PublicServices;
