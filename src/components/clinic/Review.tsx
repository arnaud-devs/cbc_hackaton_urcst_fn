import { getRandomDarkColor } from "@/utils/getRandomDarkColor";
import { Star } from "lucide-react";

const Review = ({
  className,
  showReport,
}: {
  className?: string;
  showReport?: boolean;
}) => {
  const color = getRandomDarkColor();
  return (
    <div className={"flex gap-3 sm:w-[95%] xl:w-[85%] " + className}>
      <div
        style={{ backgroundColor: color }}
        className={`size-12 flex items-center justify-center text-white text-xl rounded-full`}
      >
        S
      </div>
      <div className="flex-1 ">
        <div className="flex flex-wrap ju gap-x-3 items-center">
          <h3 className="font-medium">Shema Arnuard</h3>
          <div className="flex gap-x-[1px]">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="size-[.9rem] sm:size-[1rem]" key={index}>
                <Star stroke="" fill="#ffb900" className="!size-full" />
              </div>
            ))}
          </div>
          {showReport && (
            <p className="hover:underline cursor-pointer text-destructive text-[.8rem] sm:text-[.9rem] md:text-base">
              Report
            </p>
          )}
          <p className="ml-auto text-muted-foreground pl-4 text-[.8rem] sm:text-[.9rem] md:text-base">
            June 12, 2025
          </p>
        </div>
        <p className="text-justify leading-5 mt-1 sm:mt-2 text-[.9rem] sm:text-[.95rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, aut
          nostrum dolore ad quis neque doloribus esse eveniet, rerum atque
          exercitationem quaerat adipisci cumque magni distinctio eius quae ea
          quos.
        </p>
      </div>
    </div>
  );
};

export default Review;
