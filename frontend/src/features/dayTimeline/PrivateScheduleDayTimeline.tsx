"use client";

import { useState } from "react";
import DateSwitcher from "../timeline/DateSwitcher";

const PrivateScheduleDayTimeline = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div>
      <DateSwitcher value={currentDate} onChange={setCurrentDate} />
      <h1 className="text-xl font-bold">PrivateScheduleDayTimeline</h1>
    </div>
  );
};

export default PrivateScheduleDayTimeline;
