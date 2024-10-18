import { EditingPermissionScope } from "./common";
import { DocumentReference } from "firebase/firestore";
import { Account } from "./account";


/**
 * ## Member
 * 
 * グループ内でのメンバーの情報を持つ型。
 * 
 * #### これを継承するモデル
 *   なし
 * 
 * #### これを継承するスキーマ
 * - [DBGroupMember](../../lib/firestore/schemas/group/members.ts)
 * 
 */
export interface Member {
  account_reference: DocumentReference<Account>;
  display_name: string;
  editing_permission_scopes: EditingPermissionScope[];
  notes: string;
}
