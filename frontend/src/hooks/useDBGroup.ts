import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";
import useFirestoreRefMemo from "./useFirestoreRefMemo";
import { useCallback } from "react";
import { db } from "~/lib/firebase";
import { DBAccount, DBGroupMember } from "~/lib/firestore/schemas";

export const getGroupDocRef = (groupId: string) => {
  return doc(db, "groups", groupId);
};

export default function useDBGroup(groupRef: DocumentReference) {
  const memoizedGroup = useFirestoreRefMemo(groupRef);
  const { add: addMember } = useFirestoreCollection(
    collection(memoizedGroup!, "members")
  );

  const existAccount = useCallback(
    async (accountRef: DocumentReference<DBAccount>) => {
      if (!memoizedGroup) return false;
      const snapshot = await getDocs(
        query(
          collection(memoizedGroup, "members"),
          where("account_reference", "==", accountRef)
        )
      );
      console.log(snapshot);
      return snapshot.size > 0;
    },
    [memoizedGroup]
  );

  const addMemberToGroup = useCallback(
    async (
      accountRef: DocumentReference<DBAccount>,
      memberInfo: Omit<
        DBGroupMember,
        "account_reference" | "editing_permission_scopes" | "uid"
      >
    ) => {
      const member = {
        account_reference: accountRef,
        editing_permission_scopes: [
          "common_schedules",
          "event_pool",
          "group_settings",
          "open_schedules",
        ], // TODO: 権限設定を追加する時にちゃんとする
        ...memberInfo,
      };
      addMember(member);
    },
    [addMember]
  );

  return { existAccount, addMemberToGroup };
}
