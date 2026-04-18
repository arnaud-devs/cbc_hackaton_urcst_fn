import { Outlet } from "react-router-dom";
import personSittingImage from "@/assets/person_sitting.png";

const AuthLayout = ({
  showIllustration = true,
}: {
  showIllustration?: boolean;
}) => {
  return (
    <div className="max-w-[90rem] mx-auto relative flex  min-h-screen ">
      {showIllustration && (
        <div className=" hidden lg:flex items-center justify-center h-screen w-[45%] xl:w-1/2">
          <figure className="w-[23rem] xl:w-[30rem]">
            <img
              src={personSittingImage}
              alt="person_sitting"
              className="size-full object-cover"
            />
          </figure>
        </div>
      )}
      <main
        className={`${
          showIllustration ? "w-full lg:w-[55%] xl:w-1/2" : "w-full"
        } flex justify-center `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
