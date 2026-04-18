import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";

const VerifyOtpForm = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Handle the Enter key press - code submission
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [code]);
  return (
    <>
      <div className="z-10 w-full space-y-0">
        <h3 className="flex flex-col gap-2 text-center text-[1.2rem] lg:text-2xl font-semibold">
          Verify OTP
        </h3>
        <div className="text-center text-[.9rem] md:text-[.95rem]">
          <p className="">Protecting your account is our priority.</p>
          <p className="leading-4">
            Enter the 5-digits verification code sent to your Email/Phone.
          </p>
        </div>
      </div>
      <InputOTP
        maxLength={5}
        value={code}
        inputMode="text"
        onChange={(value) => {
          setCode(value.toUpperCase());
        }}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        autoFocus
        autoComplete="Login-Code"
      >
        <InputOTPGroup className="w-full justify-between gap-1 xs:gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              className="h-12 w-[3.3rem] xs:h-14 xs:w-[3.6rem] sm:h-16 sm:w-[4.5rem] !rounded-[4px] border border-gray-400/80 bg- text-[2rem] shadow-none focus-visible::!bg-red-500 "
              index={index}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="flex !flex-col gap-4">
        <Button
          className="w-full h-10 sm:h-11 "
          onClick={() => {
            // Handle code submission
            console.log("Code submitted:", code);
          }}
        >
          Verify
        </Button>
        <div className="text-[.9rem] md:text-[.95rem] mt-2 smn:mt-4 space-y-1  text-center">
          <p className="leading-4">
            It may take a minute to receive verification message.
          </p>
          <p className="text-muted-foreground">
            Didn't receive the code?{" "}
            <span className="text-primary cursor-pointer underline">
              Resend
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpForm;
