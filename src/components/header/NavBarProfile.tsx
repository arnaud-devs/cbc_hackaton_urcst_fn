import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBarProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") ?? "{}"); }
    catch { return {}; }
  })();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="group !p-0 !bg-transparent">
          <span className="size-8 border-[1.5px] border-black pt-1 rounded-full overflow-hidden">
            <UserRound strokeWidth={1.3} className="!size-full" />
          </span>
          <span className="group-hover:text-primary font-medium group-hover:underline">
            {user.name ?? "Admin"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 mx-8 flex flex-col gap-y-1 p-2">
        <div className="px-2 py-1.5 border-b mb-1">
          <p className="font-medium text-sm truncate">{user.name ?? "Admin"}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email ?? ""}</p>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 h-9"
        >
          <LogOut className="size-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NavBarProfile;
