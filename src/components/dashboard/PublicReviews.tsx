import { Star } from "lucide-react";
import Review from "../clinic/Review";
import { useNavbarContext } from "@/context/NavbarContext";
import { useEffect } from "react";

const PublicReviews = () => {
  const { setBreadcrumb } = useNavbarContext();

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Reviews",
    });
  }, [setBreadcrumb]);

  return (
    <div>
      <h2 className="text-[1.1rem] sm:text-[1.2rem] md:text-2xl font-medium">
        Ratings and reviews
      </h2>

      <div className="flex gap-x-1 md:gap-x-2 lg:gap-x-3 items-end mt-5">
        <span className="text-5xl sm:text-6xl  ">5.0</span>
        <div className="mb-1">
          <div className="flex gap-x-[2px]">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="size-[.9rem] sm:size-[1.1rem]" key={index}>
                <Star stroke="" fill="#ffb900" className="!size-full" />
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-[.9rem] -mt-[1px] ">(27 reviews)</p>
        </div>
      </div>
      <div className="space-y-8 mt-10 ">
        {Array.from({ length: 8 }).map((_, index) => (
          <Review className="!w-full" showReport key={index} />
        ))}
      </div>
    </div>
  );
};

export default PublicReviews;
