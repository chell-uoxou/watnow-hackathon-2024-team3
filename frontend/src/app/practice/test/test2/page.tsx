"use client";

import { useState } from "react";
import { DateTimePicker } from "~/components/ui/datetimepicker";

export default function Page() {
  const [dateTime, setDateTime] = useState(new Date());
  
  return <DateTimePicker value={dateTime} onChange={(e) => e && setDateTime(e)} />;
}
