import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";

const NavBarProfile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="group !p-0 !bg-transparent">
          <span className="size-8 border-[1.5px] border-black pt-1 rounded-full overflow-hidden">
            <UserRound strokeWidth={1.3} className="!size-full " />
          </span>
          <span className="group-hover:text-primary font-medium group-hover:underline">
            J Doe
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 mx-8 min-h-48 flex flex-col gap-y-2">
        <nav>
          <ul>
            <li>My Account</li>
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default NavBarProfile;
