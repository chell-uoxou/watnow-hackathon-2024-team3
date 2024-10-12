"use client";
import { LeftSideBar } from "~/features/leftSideBar/leftSideBar";

export default function Page() {
  return (
    <div className="flex w-2/3 h-screen">
      <LeftSideBar title="カレンダー" subTitle="あなたの" />
    </div>
  );
}
