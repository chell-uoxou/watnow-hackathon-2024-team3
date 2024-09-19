"use client";
import { useEffect } from "react";
import useCurrentGroup from "~/hooks/useCurrentGroup";

export default function Page() {
  const dbGroup = useCurrentGroup();

  useEffect(() => {
    if (dbGroup === "loading") return;
    if (dbGroup) {
      console.log(dbGroup);
    }
  }, [dbGroup]);

  return <></>;
}
