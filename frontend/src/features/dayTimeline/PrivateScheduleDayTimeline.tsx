"use client";

import DateSwitcher from "../timeline/DateSwitcher";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Timeline } from "../timeline/Timeline";
import { useCalendarSession } from "~/hooks/useCalendarSession";

const PrivateScheduleDayTimeline = () => {
  const { calendarSession, setCalendarSession } = useCalendarSession();
  return (
    <div className="relative flex flex-col size-full px-6">
      <ScrollArea className="size-full">
        <div className="my-6 mr-3">
          <Timeline interval={1} itemHeight={80} />
        </div>
      </ScrollArea>
      <div className="absolute top-[14px] left-[17px]">
        <DateSwitcher
          value={calendarSession.currentDate}
          onChange={(date: Date) =>
            setCalendarSession((prev) => ({ ...prev, currentDate: date }))
          }
        />
      </div>
    </div>
  );
};

export default PrivateScheduleDayTimeline;
