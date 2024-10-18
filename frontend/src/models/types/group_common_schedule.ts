import { DocumentReference } from "firebase/firestore";
import { Member } from "./member";
import { Schedule } from "./schedule";

/**
 * ## GroupCommonSchedule
 * グループ内のメンバーが全員関わる予定を表す型
 * 
 * #### 継承元のモデル
 * - [Schedule](./schedule.ts)
 * 
 * #### これを継承するモデル
 *  なし
 * 
 * #### これを継承するDBスキーマ
 * - [DBGroupCommonSchedule](../../lib/firestore/schemas/group/common_schedules.ts)
 */
export type GroupCommonSchedule = Schedule & {
  members: DocumentReference<Member>[];
};
