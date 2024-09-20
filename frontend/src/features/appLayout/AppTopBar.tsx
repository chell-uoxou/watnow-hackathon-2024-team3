"use client";

import { GroupSwitcher } from "./components/GroupSwitcher";
import { LogoIcon } from "~/components/common/LogoIcon";

export const AppTopBar = () => {
  return (
    <div className="flex justify-between items-center h-14 px-8">
      <div className="flex w-22 h-5.5">
        <LogoIcon />
      </div>
      <GroupSwitcher />
    </div>
  );
};
