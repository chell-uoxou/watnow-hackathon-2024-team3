"use client";
import { CardBodyWithLeftSidebar } from "~/features/appLayout/CardBodyWithLeftSidebar";
import { LeftSideBar } from "~/features/leftSideBar/LeftSideBar";

export default function Page() {
  return (
    <CardBodyWithLeftSidebar
      leftSidebar={<LeftSideBar title="カレンダー" subTitle="あなたの" />}
    >
      <div>カレンダー</div>
    </CardBodyWithLeftSidebar>
  );
}
