import AuthNavigation from "@/components/auth/AuthNavigation";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

const VerifyOtp = () => {
  return (
    <>
      <AuthNavigation />
      <div className="mx-[5%] max-w-[26rem] h-fit sm:max-w-fit sm:size-fit space-y-8 m-auto p-6 py-10  sm:p-12 lg:p-16   border rounded-sm shadow-2xl">
        <VerifyOtpForm />
      </div>
    </>
  );
};

export default VerifyOtp;
