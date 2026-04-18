import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const BookingBtn = ({
  className,
  outline = true,
  href,
}: {
  className?: string;
  outline?: boolean;
  href: string;
}) => {
  return (
    <Button
      variant={outline ? "outline" : "default"}
      size="lg"
      className={`${
        outline ? "text-primary" : ""
      } border-primary px-5 lg:px-6 ${className}`}
      asChild
    >
      <Link to={`/book${href && "/" + href}`}>Book Appointment</Link>
    </Button>
  );
};

export default BookingBtn;
