import AuthNavigation from "@/components/auth/AuthNavigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "@/assets/google_icon.png";
import facebookIcon from "@/assets/facebook_icon.png";
import ForgotPassword from "@/components/auth/ForgotPassword";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://cbc-hackaton-urcst-bn.onrender.com/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let json;
      try { json = await res.json(); } catch { json = {}; }
      if (!res.ok) {
        setError(json.message ?? "Login failed. Please try again.");
        return;
      }
      const user = json.data.admin ?? json.data.doctor ?? json.data.user ?? {};
      const role: string = json.data.role ?? (json.data.admin ? "admin" : "doctor");
      localStorage.setItem("token", json.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      navigate(role === "admin" ? "/admin/overview" : "/doctor/overview");
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavigation label="Back to Home" path="/" />
      <form
        onSubmit={handleSubmit}
        className="lg:mr-[5%] xl:mr-[10%] max-w-[28rem] xl:max-w-[30rem] flex flex-col gap-y-4 md:gap-y-5 justify-center min-h-screen  p-4"
      >
        <h1 className="text-[1.6rem] md:text-3xl font-semibold mr-auto ">
          Sign In
        </h1>
        <p className="text-muted-foreground mb-3 leading-5">
          Welcome back to Huza-Care! We're glad to see you again.
        </p>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}
        <div className="space-y-5 w-full max-w-md">
          <div className="relative ">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Mail className="size-full text-muted-foreground" />
            </div>
            <Input
              type="email"
              placeholder="Email"
              className="w-full px-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative ">
            <div className="absolute inset-0 my-auto left-5 size-5">
              <Lock className="size-full text-muted-foreground" />
            </div>
            <button
              type="button"
              className="absolute inset-y-0 my-auto right-5 size-5"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <Eye className="size-full text-muted-foreground" />
              ) : (
                <EyeOff className="size-full text-muted-foreground" />
              )}
            </button>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex justify-between text-[.9rem]">
              <div className="flex text-muted-foreground items-center">
                <Checkbox id="terms" className="size-5 mr-1" />
                <span className="leading-4">Remember me</span>
              </div>
              <ForgotPassword />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 md:h-12 mt-2 md:mt-4"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </div>
        <div>
          <p className="text-[.9rem] md:text-[.95rem] text-center my-2 md:my-3 lg:my-5 text-muted-foreground">
            Or Continue with
          </p>
          <div className="flex items-center justify-between gap-x-3">
            <div className="basis-1/2 py-2 md:py-3 flex justify-center bg-muted-foreground/5 hover:bg-muted-foreground/10 cursor-pointer rounded">
              <figure className="size-5 md:size-7">
                <img src={googleIcon} alt="google_icon" className="size-full" />
              </figure>
            </div>
            <div className="basis-1/2 py-2 md:py-3 flex justify-center bg-muted-foreground/5 hover:bg-muted-foreground/10 cursor-pointer rounded">
              <figure className="size-5 md:size-7">
                <img
                  src={facebookIcon}
                  alt="facebook_icon"
                  className="size-full"
                />
              </figure>
            </div>
          </div>
        </div>
        <p className="mt-2 md:mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-primary underline">
            Register here
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
