import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { FaQuoteLeft } from "react-icons/fa6";

const SuccessStories = () => {
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
    <div
      className="group flex flex-col items-center justify-center my-16 md:my-36 scroll-mt-40 "
      id="success-stories"
    >
      <h1 className="font-semibold text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] mb-6 md:mb-10 lg:mb-16 ">
        Success Stories
      </h1>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-full  md:max-w-[75%] lg:max-w-[75%] xl:max-w-[70%] group self-end"
        setApi={setApi}
      >
        <CarouselContent className="w-full -ml-2 items-center ">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[100%] md:basis-[70%] xl:basis-1/2"
            >
              <div
                className={
                  (current == index + 1
                    ? "max-w-[27rem] sm:max-w-[30rem] md:max-w-[35rem]    "
                    : "max-w-[30rem] scale-[75%] opacity-65") +
                  " transition-all duration-1000 ease-in-out mx-auto"
                }
              >
                <div
                  className={
                    (current == index + 1 ? "bg-primary" : "bg-gray-500") +
                    " relative px-6 lg:px-7  mx-auto text-primary-foreground  pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 rounded-md text-center min-h-52 -z-10 transition-colors duration-700 ease-in-out "
                  }
                >
                  <div className="absolute top-5 lg:top-7 left-5 sm:left-5 lg:left-7 size-[1.3rem] sm:size-6 lg:size-7">
                    <FaQuoteLeft className="size-full" />
                  </div>
                  <p
                    className={
                      current == index + 1
                        ? "max-w-[42rem] text-[.9rem] sm:text-[.95rem] lg:text-base"
                        : "line-clamp-4 text-lg"
                    }
                  >
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the.
                  </p>
                </div>
                <figure className=" mx-auto -mt-6 sm:-mt-9 md:-mt-10 lg:-mt-12 size-24 sm:size-28 lg:size-36 rounded-full overflow-hidden z-10">
                  <img
                    src="https://placehold.co/600x400"
                    alt=""
                    className="size-full object-cover"
                  />
                </figure>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -left-[25%] lg:-left-[30%] xl:-left-[35%] disabled:hidden" />
        <CarouselNext className="hidden md:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -right-5 disabled:hidden" />
      </Carousel>
      <div className="flex gap-x-1 mt-10">
        <div
          className={
            (current == 1 ? "w-9 bg-primary" : "w-5 bg-muted-foreground/34") +
            " h-2  rounded-md duration-700"
          }
        />
        <div
          className={
            (current > 1 && current < count
              ? "w-9 bg-primary"
              : "w-5 bg-muted-foreground/34") + "  h-2  rounded-md duration-700"
          }
        />
        <div
          className={
            (current == count
              ? "w-9 bg-primary"
              : "w-5 bg-muted-foreground/34") + "  h-2  rounded-md duration-700"
          }
        />
      </div>
    </div>
  );
};

export default SuccessStories;
