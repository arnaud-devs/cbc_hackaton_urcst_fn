import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VerifyOtpForm from "./VerifyOtpForm";

const VerifyOtpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="space-y-2 w-[95%] max-w-full sm:!max-w-fit p-5 pt-10 sm:p-12 lg:p-16">
        <VerifyOtpForm />
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOtpDialog;
