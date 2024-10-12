"use client";

import useGroupRouter from "~/hooks/useGroupRouter";

export default function Page() {
  const groupRouter = useGroupRouter();
  groupRouter.pushInGroup("/calendar");
  return null;
}
