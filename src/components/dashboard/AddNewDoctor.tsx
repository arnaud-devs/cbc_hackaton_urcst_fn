import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CloudUpload, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddNewDoctor = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="!h-10 !px-4">
            Add Doctor <Plus size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[33rem]">
          <DialogHeader className="gap-y-0.5">
            <DialogTitle>New Doctor</DialogTitle>
            <DialogDescription>
              Please provide the doctor's details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name-1">Doctor Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Pedro Duarte"
                className="w-full !h-11"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name-1">Email</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Pedro Duarte"
                className="w-full !h-11"
              />
            </div>
            <div className="flex justify-between gap-3">
              <div className="w-1/2 grid gap-1">
                <Label htmlFor="username-1">Telephone</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="+250790883242"
                  className="w-full !h-11"
                />
              </div>
              <div className="w-1/2 grid gap-1">
                <Label htmlFor="username-1">Department</Label>
                <Select>
                  <SelectTrigger className="w-full !h-11">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Department 1</SelectItem>
                    <SelectItem value="2">Department 2</SelectItem>
                    <SelectItem value="3">Department 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" grid gap-1">
              <Label htmlFor="username-1">Profile Image</Label>
              <div className="flex flex-col items-center justify-center h-45 border border-input border-dashed rounded ">
                <p className="text-sm">Drag and Drop</p>
                <p className="cursor-pointer group flex items-center gap-x-1 text-primary">
                  <span className="group-hover:underline">Upload</span>
                  <CloudUpload size={20} />
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Doctor</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddNewDoctor;
