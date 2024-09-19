import { collection, DocumentReference } from "firebase/firestore";
import { Account } from "~/models/types/account";
import { Group } from "~/models/types/groups";
import Member from "~/models/types/members";
import { useFirestoreCollection } from "./useFirestoreCollection";
import useFirestoreRefMemo from "./useFirestoreRefMemo";
import { useCallback } from "react";

export default function useDBGroup(groupRef: DocumentReference<Group>) {
  const memoizedGroup = useFirestoreRefMemo(groupRef);
  const { add: addMember } = useFirestoreCollection(
    collection(memoizedGroup!, "members")
  );

  const addMemberToGroup = useCallback(
    async (
      accountRef: DocumentReference<Account>,
      memberInfo: Omit<
        Member,
        "account_reference" | "editing_permission_scopes"
      >
    ) => {
      const member: Member = {
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

  return { addMemberToGroup };
}
