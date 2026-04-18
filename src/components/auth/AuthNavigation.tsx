import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthNavigation = ({
  label = "Go Back",
  path,
}: {
  label?: string;
  path?: string;
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (path) {
      navigate(path);
    } else {
      navigate(-1);
    }
  };
  return (
    <div
      onClick={handleGoBack}
      className="group fixed top-10 left-[5%] md:left-12 flex items-center gap-2 text-muted-foreground cursor-pointer hover:font-medium duration-300 text-sm md:text-base"
    >
      <div className="size-8 md:size-10 p-2 md:p-[10px] bg-muted-foreground/10 group-hover:bg-muted-foreground/15 cursor-pointer rounded-full flex items-center">
        <ArrowLeft className="size-full" />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default AuthNavigation;
