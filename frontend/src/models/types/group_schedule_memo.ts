import { DocumentReference } from "firebase/firestore";
import { ScheduleMemo } from "./schedule_memo";
import { Member } from "./member";
import { Account } from "./account";

/**
 * ## GroupScheduleMemo
 * 予定メモのうち、グループ内で共有される予定メモを表す型。
 *
 * #### 継承元のモデル
 * - [ScheduleMemo](./schedule_memo.ts)
 *
 * #### これを継承するモデル
 * なし
 *
 * #### これを継承するDBスキーマ
 * [DBGroupScheduleMemo](../../lib/firestore/schemas/group/schedule_memos.ts)
 */
export type GroupScheduleMemo = ScheduleMemo & {
  created_by_member: DocumentReference<Member>;
  created_by_account: DocumentReference<Account>;
};
