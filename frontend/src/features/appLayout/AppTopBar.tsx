"use client";

import { GroupSwitcher } from "./components/GroupSwitcher";
import { LogoIcon } from "~/components/common/LogoIcon";
import useCurrentAccount from "~/hooks/useCurrentAccount";
import { useEffect, useState } from "react";
import { Group } from "~/models/types/groups";

export const AppTopBar = () => {
  const [groups, setGroups] = useState<Group[] | null | "loading">("loading");
  const { getGroupsByAccount } = useCurrentAccount();

  useEffect(() => {
    getGroupsByAccount().then((groups) => {
      console.log(groups);
      setGroups(groups);
    });
  }, [getGroupsByAccount]);

  return (
    <div className="flex justify-between items-center h-14 px-8">
      <div className="flex w-22 h-5.5">
        <LogoIcon />
      </div>
      <GroupSwitcher
        groups={groups !== "loading" && groups !== null ? groups : []}
        isLoading={groups === "loading"}
      />
    </div>
  );
};
