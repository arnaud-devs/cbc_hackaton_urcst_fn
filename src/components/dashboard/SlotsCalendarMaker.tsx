import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SlotsCalendarMaker = ({
  ranges,
}: {
  ranges: Array<{
    startDate: Date;
    endDate: Date;
    type: "available" | "fully-reserved";
    color?: string;
  }>;
}) => {
  const customRanges = ranges.map((range, index) => {
    if (range.type === "available") {
      return { ...range, color: "#16a34a46", key: "selection-" + index };
    } else {
      return { ...range, color: "#dc262635", key: "selection-" + index };
    }
  });
  return (
    <div className="space-y-4">
      <div className="flex gap-5">
        <div className="flex items-center gap-1 text-muted-foreground">
          <div className="bg-green-600/15 rounded-full border border-green-600 size-4" />
          <span className="text-sm">Available slots</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <div className="bg-red-600/20 rounded-full border border-red-600 size-4" />
          <span className="text-sm">Fully Reserved</span>
        </div>
      </div>
      <DateRange
        onChange={() => {}}
        moveRangeOnFirstSelection={false}
        ranges={customRanges}
        preventSnapRefocus={true}
        showDateDisplay={false}
        minDate={addDays(new Date(), -31)}
        editableDateInputs={true}
        showPreview={false}
        className="w-full"
      />
    </div>
  );
};

export default SlotsCalendarMaker;
