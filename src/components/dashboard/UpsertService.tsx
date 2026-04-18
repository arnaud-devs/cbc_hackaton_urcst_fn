import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const UpsertService = ({
  mode,
  open,
  setOpen,
}: {
  mode: "new" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[33rem]">
          <DialogHeader className="gap-y-0.5">
            <DialogTitle>
              {mode === "new" ? "Add New" : "Edit"} Service
            </DialogTitle>
            <DialogDescription>
              Please provide required details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name-1">Service Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Neurology"
                className="w-full !h-11"
              />
            </div>
            <div className="flex justify-between gap-3">
              <div className="flex-2/3 grid gap-1">
                <Label htmlFor="username-1">Time</Label>
                <Input
                  id="name-1"
                  type="number"
                  name="name"
                  value="30"
                  className="w-full !h-11"
                />
              </div>
              <div className="flex-1/3 self-end">
                <Select defaultValue="1">
                  <SelectTrigger className="w-full !h-11">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Minute</SelectItem>
                    <SelectItem value="2">Hour(s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" grid gap-1">
              <Label htmlFor="username-1">Description</Label>
              <Textarea
                className=""
                value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, facere! Non exercitationem nesciunt ut aliquam, inventore est esse illo incidunt animi sint dolores reiciendis dolorem rem deleniti asperiores pariatur? Temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, facere! Non exercitationem nesciun"
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Service</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpsertService;
