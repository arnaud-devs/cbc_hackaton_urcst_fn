import AuthNavigation from "@/components/auth/AuthNavigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <>
      <AuthNavigation label="Back to Home" path="/" />
      <form className="lg:mr-[5%] xl:mr-[10%] max-w-[28rem] xl:max-w-[30rem] flex flex-col gap-y-4 md:gap-y-5 justify-center min-h-screen  p-4">
        <h1 className="text-[1.6rem] md:text-3xl font-semibold mr-auto ">
          Create an Account
        </h1>
        <p className="text-muted-foreground mb-3 leading-5">
          Welcome to Huza-Care! Let's get you started on your journey to better
          health.
        </p>
        <div className="space-y-5 w-full max-w-md">
          <div className="relative ">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <User className="size-full text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full px-12"
            />
          </div>
          <div className="relative ">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Mail className="size-full text-muted-foreground" />
            </div>
            <Input type="email" placeholder="Email" className="w-full px-12" />
          </div>
          <div className="relative ">
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
          <div className="relative ">
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
          <Button className="w-full h-11 md:h-12 mt-2 md:mt-4" ><Link to="/onboard">Signup</Link></Button>
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
