"use client";

import { useState } from "react";
import DateSwitcher  from "~/features/timeline/DateSwitcher";

export default function Page() {  
  const [value, setValue] = useState(new Date());

  return <DateSwitcher value={value} onChange={(date) => setValue(date)}/>;
}
