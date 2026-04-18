import Autoplay from "embla-carousel-autoplay";
import React from "react";
import BlogBannerItem from "./BlogBannerItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";

const BlogBanner = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative h-[16rem] md:h-[20rem] rounded-xl overflow-hidden ">
      {/* <BlogBannerItem /> */}
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
        className="group w-full "
        setApi={setApi}
      >
        <CarouselContent className="h-[16rem] md:h-[20rem] duration-300">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="" key={index}>
              <BlogBannerItem />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:group-hover:inline-flex size-10 bg-white/10 border-2 border-white text-white left-4 disabled:hidden" />
        <CarouselNext className="hidden sm:group-hover:inline-flex z-20 size-10 bg-white/10 border-2 border-white text-white right-4 disabled:hidden" />
      </Carousel>
      <div className="absolute inset-0 bottom-3 sm:bottom-5 top-auto flex items-center justify-center gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            className={`${
              current == index + 1 ? "w-6 bg-amber-400" : "w-4 bg-white"
            }  cursor-pointer w-4 h-2 rounded-sm duration-500`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogBanner;
