import { useNavbarContext } from "@/context/NavbarContext";
import { CloudUpload } from "lucide-react";
import { useEffect } from "react";

const Gallery = () => {
  const { setBreadcrumb } = useNavbarContext();

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Gallery",
    });
  }, [setBreadcrumb]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-[auto]  gap-3">
      <div className="h-70 flex flex-col items-center justify-center  border border-input border-dashed rounded ">
        <p className="text-sm">Drag and Drop</p>
        <p className="cursor-pointer group flex items-center gap-x-1 text-primary">
          <span className="group-hover:underline">Upload</span>
          <CloudUpload size={20} />
        </p>
      </div>
      {Array.from({ length: 10 }, () => (
        <div className="h-70 bg-gray-200 "></div>
      ))}
    </div>
  );
};

export default Gallery;
