import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useRef } from "react";

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null!);

  function goNext() {
    if (!calendarRef.current) {
      return;
    }
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  }
  return (
    <>
      <button onClick={goNext}>Skip To Next Election!</button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={[
          { title: "event 1", date: "2025-06-01" },
          { title: "event 2", date: "2019-04-02" },
        ]}
        initialView="dayGridMonth"
      />
    </>
  );
}
