import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import nurseWithScrubs from "@/assets/nurse_with_scrubs.png";
const GetInTouch = () => {
  return (
    <div className="flex gap-x-[10%] justify-center items-center pt-20 lg:pt-28 ">
      <figure className="hidden md:block w-[20rem] lg:w-[25rem]">
        <img
          src={nurseWithScrubs}
          alt="nurse_with_scrubs"
          className="size-full"
          loading="lazy"
        />
      </figure>
      <div className="w-[25rem]">
        <h2 className="font-semibold text-[1.5rem] md:text-[1.7rem] lg:text-3xl mb-2">
          Get in Touch
        </h2>
        <p className="text-muted-foreground leading-5">
          If you have any questions or inquiries, feel free to reach out to us!
        </p>
        <form className="flex flex-col gap-2 sm:gap-3 md:gap-4 mt-6">
          <div>
            <label
              htmlFor="name"
              className="text-[.95rem] sm:text-base font-medium"
            >
              Name:
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Your Name"
              name="name"
              required
              className="px-4"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-[.95rem] sm:text-base font-medium"
            >
              Email:
            </label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              name="email"
              required
              className="px-4"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-[.95rem] sm:text-base font-medium"
            >
              Message:
            </label>
            <Textarea
              placeholder="Type your message here."
              className="min-h-24 sm:min-h-28"
            />
          </div>
          <Button className="w-full h-11 md:h-12 mt-2 sm:mt-4">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
