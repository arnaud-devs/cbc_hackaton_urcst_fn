import { ArrowLeft, ChevronRight, Mail, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRef, useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const isFirstRender = useRef(true);

  const [view, setView] = useState<"reset" | "email" | "sms">("reset");
  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    navigate("/auth/verify-otp");
  };

  const handleDialogClose = () => {
    console.log("inn");
    isFirstRender.current = true;
    setView("reset");
  };
  console.log(isFirstRender.current);
  return (
    <Dialog onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="font-normal px-0">
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden flex flex-col justify-center gap-1 space-y-5 sm:space-y-6 pt-16 pb-0 min-h-[21rem] sm:min-h-[23rem] xs:w-[92%] xs:max-w-[28rem] sm:max-w-[30rem] px-4 sm:px-7">
        {view !== "reset" && (
          <div
            onClick={() => {
              isFirstRender.current = false;
              setView("reset");
            }}
            className="size-8 rounded-full hover:bg-muted-foreground/15 bg-muted-foreground/10 px-[7px] cursor-pointer absolute left-4 sm:left-7 top-5 duration-200"
          >
            <ArrowLeft className="size-full" />
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-[1.25rem] sm:text-[1.3rem] md:text-[1.4rem] text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "tween",
                ease: "easeInOut",
              }}
            >
              Reset your password
            </motion.p>
          </DialogTitle>
          <DialogDescription className="overflow-hidden text-[.9rem] sm:text-[.95rem] leading-5 text-center">
            {view === "reset" && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{
                  duration: 0.5,
                  type: "tween",
                  ease: "easeInOut",
                }}
              >
                "We'll send you a one-time code to reset your password. Choose
                where you want to get it."
              </motion.p>
            )}
            {view !== "reset" && (
              <motion.p
                initial={{ opacity: 0, translateX: -250 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  ease: "easeInOut",
                }}
              >
                {`Enter the ${
                  view === "email" ? "email" : "phone number"
                } linked to your account. We'll send you a verification code by ${
                  view === "email" ? "Email" : "SMS"
                }.`}
              </motion.p>
            )}
          </DialogDescription>
        </DialogHeader>
        {view === "reset" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{
              duration: 0.5,
              type: "tween",
              ease: "easeInOut",
            }}
            className="h-28 space-y-4 w-full "
          >
            <Button
              onClick={() => setView("email")}
              className="w-full cursor-pointer flex items-center gap-2 h-12 bg-muted-foreground/10 hover:bg-muted-foreground/15 duration-100 text-black font-normal px-4 rounded-sm"
            >
              <span className="block size-5">
                <Mail className="size-full" />
              </span>
              <span className="text-[.9rem]">Via Email</span>
              <span className="block size-5 ml-auto">
                <ChevronRight className="size-full" />
              </span>
            </Button>
            <Button
              onClick={() => setView("sms")}
              className="w-full cursor-pointer flex items-center gap-2 h-12 bg-muted-foreground/10 hover:bg-muted-foreground/15 duration-100 text-black font-normal px-4 rounded-sm"
            >
              <span className="block size-5">
                <Smartphone className="size-full" />
              </span>
              <span className="text-[.9rem]">Via SMS</span>
              <span className="block size-5 ml-auto">
                <ChevronRight className="size-full" />
              </span>
            </Button>
          </motion.div>
        )}
        {view !== "reset" && (
          <div className="h-28 overflow-hidden">
            <motion.form
              initial={{ opacity: 0, translateX: -250 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                ease: "easeInOut",
              }}
              onSubmit={handleSubmitForm}
            >
              <div className="relative ">
                <div className="absolute inset-0 my-auto left-5 size-5">
                  {view === "email" ? (
                    <Mail className="size-full text-muted-foreground" />
                  ) : (
                    <Smartphone className="size-full text-muted-foreground" />
                  )}
                </div>
                <Input
                  type="email"
                  placeholder={view === "email" ? "Email" : "Phone number"}
                  className="w-full px-12"
                />
              </div>
              <DialogFooter>
                <Button className="w-full h-11 md:h-12 mt-2 md:mt-4">
                  Send-OTP
                </Button>
              </DialogFooter>
            </motion.form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
