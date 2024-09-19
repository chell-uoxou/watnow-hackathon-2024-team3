"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    console.log("最初に実行");
  }, []);
  return <div>practice</div>;
}
