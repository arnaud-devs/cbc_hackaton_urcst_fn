import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getRandomDarkColor } from "@/utils/getRandomDarkColor";

type ScheduleDrawerState =
  | {
      mode: "new" | "viewer";
      slot?: string;
    }
  | undefined;

interface Props {
  setScheduleDrawer: (state: ScheduleDrawerState) => void;
}

const ScheduleCalendar = ({ setScheduleDrawer }: Props) => {
  const handleEventClick = () => {
    setScheduleDrawer({ mode: "viewer" });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      eventClick={handleEventClick}
      // dayHeaderFormat={{
      //   weekday: "long", // Monday, Tuesday...
      //   month: "short", // Jan, Feb...
      //   day: "numeric", // 1,2,3...
      // }}
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, //
      }}
      slotMinTime="08:00:00"
      slotMaxTime="19:00:00"
      allDaySlot={false}
      // height="auto"

      contentHeight={"auto"}
      events={[
        {
          title: "NEURO_01_2025",
          date: new Date("2025-09-02T06:10:50.381+00:00"),
          end: new Date("2025-09-02T06:40:20.381+00:00"),
          color: getRandomDarkColor(),
        },
        {
          title: "NEURO_02_2025",
          date: new Date("2025-09-02T08:10:51.381+00:00"),
          end: new Date("2025-09-02T08:40:51.381+00:00"),
          color: getRandomDarkColor(),
        },
        {
          title: "NEURO_03_2025",
          date: new Date("2025-09-02T10:10:51.381+00:00"),
          end: new Date("2025-09-02T10:40:51.381+00:00"),
          color: getRandomDarkColor(),
        },
        {
          title: "NEURO_04_2025",
          date: new Date("2025-09-02T12:10:51.381+00:00"),
          end: new Date("2025-09-02T12:40:51.381+00:00"),
          color: getRandomDarkColor(),
        },
      ]}
    />
  );
};

export default ScheduleCalendar;
