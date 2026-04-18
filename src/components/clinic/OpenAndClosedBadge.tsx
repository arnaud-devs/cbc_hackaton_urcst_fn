const OpenAndClosedBadge = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) => {
  return isOpen ? (
    <span
      className={`absolute top-3 right-3  h-[1.6rem] flex items-center rounded-2xl text-[.8rem] md:text-sm font-medium bg-primary text-white px-3 ${className}`}
    >
      Open
    </span>
  ) : (
    <span
      className={`absolute top-3 right-3  h-[1.6rem] flex items-center rounded-2xl text-[.8rem] md:text-sm font-medium bg-destructive text-white px-3 ${className}`}
    >
      Closed
    </span>
  );
};

export default OpenAndClosedBadge;
