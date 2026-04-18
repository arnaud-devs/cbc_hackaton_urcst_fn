export type Status = "pending" | "cancelled" | "completed";

const AppointmentStatus = ({ status }: { status: Status }) => {
  const items: Record<Status, string> = {
    pending: "bg-blue-400/20 text-blue-700",
    completed: "bg-green-400/20 text-green-700",
    cancelled: "bg-red-400/20 text-red-700",
  };

  return (
    <div
      className={`px-[14px] h-6 flex items-center py-[3px] w-fit text-[.8rem] text-center rounded-md capitalize font-medium ${items[status]} !rounded-full `}
    >
      {status}
    </div>
  );
};

export default AppointmentStatus;
