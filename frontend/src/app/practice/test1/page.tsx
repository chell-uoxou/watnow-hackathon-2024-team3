"use client";

import { Timeline } from "~/features/timeLine/Timeline";

export default function test() {
  return (
    <div className="flex w-2/3 ">
      <Timeline hourHeight={100} interval={0.5} />
      {/* <Timeline hourHeight={110} interval={0.25} />
      <Timeline hourHeight={120} interval={1} />
      <Timeline hourHeight={13} interval={1} /> */}
    </div>
  );
}
