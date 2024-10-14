"use client";

import { useState } from "react";
import DateSwitcher from "../timeline/DateSwitcher";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Timeline } from "../timeline/Timeline";

const PrivateScheduleDayTimeline = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className="relative flex flex-col size-full px-6">
      <ScrollArea className="size-full">
        <div className="my-6 mr-3">
          <Timeline interval={1} itemHeight={80} />
        </div>
      </ScrollArea>
      <div className="absolute top-[14px] left-[17px]">
        <DateSwitcher value={currentDate} onChange={setCurrentDate} />
      </div>
    </div>
  );
};

export default PrivateScheduleDayTimeline;
