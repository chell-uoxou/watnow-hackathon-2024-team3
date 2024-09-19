"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useGroupRouter() {
  const nextRouter = useRouter();
  const pathname = usePathname();
  const groupRegex = useMemo(() => /^\/g\/([^/]+)(\/|$)/, []);

  const isInGroup = groupRegex.test(pathname);

  const extractId = useCallback(
    (path: string) => {
      const match = path.match(groupRegex);
      return match ? match[1] : null;
    },
    [groupRegex]
  );

  const groupId = extractId(pathname);

  const getGroupPath = useCallback(
    (href: string) => {
      return groupId ? `/g/${groupId}${href}` : href;
    },
    [groupId]
  );

  const pushInGroup = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (!isInGroup) {
        console.error("You are not in a group");
        return;
      }
      const realHref = getGroupPath(href);
      nextRouter.push(realHref, options);
    },
    [getGroupPath, isInGroup, nextRouter]
  );

  const replaceInGroup = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (!isInGroup) {
        console.error("You are not in a group");
        return;
      }
      nextRouter.replace(getGroupPath(href), options);
    },
    [getGroupPath, isInGroup, nextRouter]
  );

  return {
    isInGroup,
    groupId,
    getGroupPath,
    pushInGroup,
    replaceInGroup,
  };
}
