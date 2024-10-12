"use client";

import { Timeline } from "~/features/timeline/Timeline";

export default function Page() {
  return (
    <div className="flex w-2/3 ">
      <Timeline itemHeight={100} interval={0.25} />
    </div>
  );
}
