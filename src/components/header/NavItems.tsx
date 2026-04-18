import { useNavbarContext } from "@/context/NavbarContext";
import { Link } from "react-router-dom";

export type NavbarItem =
  | "Home"
  | "Clinics"
  | "Health"
  | "What is HuzaCare?"
  | "Success Stories";

const NavItems = ({
  className,
  setIsOpen,
}: {
  className?: string;
  setIsOpen?: (value: boolean) => void;
}) => {
  const { activeItem } = useNavbarContext();

  const items: Array<{ label: NavbarItem; path: string }> = [
    { label: "Home", path: "/" },
    { label: "Clinics", path: "/clinics" },
    { label: "Health", path: "/health" },
    { label: "What is HuzaCare?", path: "/#what-is-huza-care" },
    { label: "Success Stories", path: "/#success-stories" },
  ];

  // Add Manage Articles link for admin/authorized users
  const adminItems: Array<{ label: string; path: string }> = [
    { label: "", path: "/health/manage" },
  ];

  return (
    <ul
      className={`flex flex-col lg:flex-row items-center gap-x-4 xl:gap-x-8 font-normal ${className}`}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      {items.map((item) => (
        <li key={item.label}>
          {!item.path.includes("#") ? (
            <Link
              to={item.path}
              className={`${
                activeItem === item.label ? "text-primary border-b-2" : ""
              } capitalize hover:text-primary text-nowrap hover:border-b-2 border-primary py-1 text-[.95rem]`}
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.path}
              className={`${
                activeItem === item.label ? "text-primary border-b-2" : ""
              } capitalize hover:text-primary text-nowrap hover:border-b-2 border-primary py-1 text-[.95rem]`}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
      {/* Admin items - you can conditionally show these based on user role */}
      {adminItems.map((item) => (
        <li key={item.label}>
          <Link
            to={item.path}
            className="capitalize hover:text-primary text-nowrap hover:border-b-2 border-primary py-1 text-[.95rem] text-muted-foreground"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
