"use client";

import { collection } from "firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";
import useGroupRouter from "./useGroupRouter";
import { useEffect, useState } from "react";
import { Group } from "~/models/types/groups";
import { db } from "~/lib/firebase";

export default function useCurrentGroup() {
  const { groupId } = useGroupRouter();
  const { get } = useFirestoreCollection<Group>(collection(db, "groups"));
  const [group, setGroup] = useState<Group | null | "loading">("loading");

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
