import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

const SlotDrawerContent = () => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="text-lg">NEURO_01_2025</DrawerTitle>
          <DrawerDescription>
            Show clients when you're available.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter />
      </div>
    </DrawerContent>
  );
};

export default SlotDrawerContent;
