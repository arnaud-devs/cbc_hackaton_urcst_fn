import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SocialMedia from "../home/SocialMedia";

const Footer = () => {
  return (
    <div className="bg-primary w-full px-[5%] text-primary-foreground py-4 sm:py-10">
      <div className="w-full max-w-[90rem] flex flex-col gap-y-16 md:flex-row items-center justify-center xl:justify-between gap-x-[5%] md:gap-x-20 lg:gap-x-[15%] mb-10 mt-6 mx-auto ">
        <div className="space-y-5 sm:space-y-7 md:space-y-10  max-w-[25rem] lg:max-w-[24rem] xl:max-w-[26rem]">
          <div className="flex items-center gap-2 md:gap-4 font-semibold">
            <figure className="size-[4rem] sm:size-[5rem] md:size-[5.5rem] lg:size-[6rem]">
              <img
                src="/logo-light.png"
                className="size-full"
                alt="Huza-Care-Logo"
              />
            </figure>
            <span className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.3rem]">
              HuzaCare
            </span>
          </div>
          <div className="text-[.95rem] sm:text-base">
            <p className="text-justify leading-5 mb-4">
              HuzaCare is a healthcare platform that connects patients with
              healthcare providers, offering a range of services to improve
              access to quality care.
            </p>
            <address className="">
              <p>
                Contact us at:{" "}
                <a href="mailto:info@example.com">info@example.com</a>
              </p>
              <p>
                Call: <a href="tel:+2507000000">+250 788 123 456</a>
              </p>
              <p>KN 123 St, Kigali, Rwanda</p>
            </address>
          </div>
          <SocialMedia />
        </div>
        <div className="w-full max-w-[27rem] ">
          <p className="text-center text-[1.2rem] lg:text-[1.55rem] font-medium mb-3 lg:mb-5 leading-5 sm:leading-6">
            Subscribe to our newsletter <br /> for the latest updates.
          </p>
          <form action="" className="flex items-center justify-between w-full">
            <Input
              type="email"
              placeholder="Your Email"
              className="h-10 md:h-11 bg-background text-sm md:text-[.9rem] lg:text-[.95rem] rounded-none border-none rounded-l-sm flex-1 text-black placeholder:text-muted-foreground/90 outline-none px-5"
            />
            <Button
              type="submit"
              size="lg"
              className="h-10 md:h-11 bg-orange-400 hover:bg-orange-400/80 text-primary-foreground px-5 rounded-none rounded-r-sm "
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="max-w-[90rem] flex flex-wrap-reverse gap-y-5 text-sm md:text-base items-center justify-between border-t border-primary-foreground/30 py-3 sm:py-6 mx-auto">
        <p>&copy; {new Date().getFullYear()} HuzaCare. All rights reserved.</p>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="#" className="">
            Privacy Policy
          </Link>
          <Link to="#" className="">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
