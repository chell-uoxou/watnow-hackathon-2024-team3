"use client";

import { Groups } from "./Groups";
import { LogoIcon } from "./LogoIcon";

export const AppTopBar = () => {
  return (
    <div className="flex flex-row w-screen  bg-white justify-between items-center ">
      <div className="flex w-22 h-5.5 ml-8">
        <LogoIcon />
      </div>
      <Groups />
    </div>
  );
};
