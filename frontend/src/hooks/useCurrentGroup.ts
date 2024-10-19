"use client";

import { collection } from "firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";
import useGroupRouter from "./useGroupRouter";
import { useEffect, useState } from "react";
import { db } from "~/lib/firebase";
import { DBGroup } from "~/lib/firestore/schemas";

export default function useCurrentGroup() {
  const { groupId } = useGroupRouter();
  const { get } = useFirestoreCollection<DBGroup>(collection(db, "groups"));
  const [group, setGroup] = useState<DBGroup | null | "loading">("loading");

  useEffect(() => {
    get(groupId!).then((group) => {
      if (!group) {
        console.error(`Group (id: ${groupId}) not found`);
        setGroup(null);
      } else {
        console.log("Group found", group);
        setGroup(group);
      }
    });
  }, [get, groupId]);

  return group;
}
