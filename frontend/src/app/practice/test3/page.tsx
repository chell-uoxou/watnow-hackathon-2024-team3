"use client";

import { useState } from "react";
import Dateswitcher  from "~/features/timeline/DateSwitcher";

export default function Page() {  
  const [value, setValue] = useState(new Date());
  const handlePreviousDay = () => {
    setValue(new Date(value.setDate(value.getDate() - 1)));
  };

  const handleNextDay = () => {
    setValue(new Date(value.setDate(value.getDate() + 1)));
  };

  return <Dateswitcher value={value} handlePreviousDay={handlePreviousDay} handleNextDay={handleNextDay}/>;
}
