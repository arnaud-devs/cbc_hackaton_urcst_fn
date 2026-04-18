import AuthNavigation from "@/components/auth/AuthNavigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EyeOff, Lock, Mail, Stethoscope, User, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Role = "patient" | "doctor";

const Signup = () => {
  const [role, setRole] = useState<Role>("patient");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (role === "doctor") {
      navigate("/onboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <AuthNavigation label="Back to Home" path="/" />
      <form className="lg:mr-[5%] xl:mr-[10%] max-w-[28rem] xl:max-w-[30rem] flex flex-col gap-y-4 md:gap-y-5 justify-center min-h-screen p-4">
        <h1 className="text-[1.6rem] md:text-3xl font-semibold mr-auto">
          Create an Account
        </h1>
        <p className="text-muted-foreground mb-1 leading-5">
          Welcome to Huza-Care! Let's get you started on your journey to better
          health.
        </p>

        {/* Role selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">I am a:</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md border-2 text-sm font-medium transition-colors ${
                role === "patient"
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60"
              }`}
            >
              <UserRound className="size-4" />
              Patient
            </button>
            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md border-2 text-sm font-medium transition-colors ${
                role === "doctor"
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60"
              }`}
            >
              <Stethoscope className="size-4" />
              Doctor
            </button>
          </div>
          {role === "doctor" && (
            <p className="text-xs text-muted-foreground">
              You'll be guided through a quick onboarding to set up your doctor profile.
            </p>
          )}
        </div>

        <div className="space-y-5 w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <User className="size-full text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full px-12"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Mail className="size-full text-muted-foreground" />
            </div>
            <Input type="email" placeholder="Email" className="w-full px-12" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Lock className="size-full text-muted-foreground" />
            </div>
            <div className="absolute inset-y-0 my-auto right-5 size-5">
              <EyeOff className="size-full text-muted-foreground" />
            </div>
            <Input
              type="password"
              placeholder="Password"
              className="w-full px-12"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Lock className="size-full text-muted-foreground" />
            </div>
            <div className="absolute inset-y-0 my-auto right-5 size-5">
              <EyeOff className="size-full text-muted-foreground" />
            </div>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-12"
            />
          </div>
          <div className="flex text-muted-foreground text-[.9rem] items-center">
            <Checkbox id="terms" className="size-5 mr-2" />
            <span className="leading-4">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </span>
          </div>
          <Button
            type="button"
            onClick={handleSignup}
            className="w-full h-11 md:h-12 mt-2 md:mt-4"
          >
            {role === "doctor" ? "Sign Up as Doctor" : "Sign Up as Patient"}
          </Button>
        </div>
        <p className="mt-2 md:mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary underline">
            Login here
          </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
