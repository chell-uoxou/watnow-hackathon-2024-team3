import Member from "~/models/types/members";
import { Account } from "./types/account";
import { DocumentReference } from "firebase/firestore";
import { Group } from "./types/groups";

const addMemberToGroup = async (
  groupRef: DocumentReference<Group>,
  accountRef: DocumentReference<Account>,
  memberInfo: Omit<Member, "account_reference" | "editing_permission_scopes">
) => {};
