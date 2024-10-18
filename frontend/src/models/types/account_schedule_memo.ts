import { ScheduleMemo } from "./schedule_memo";

/**
 * ## AccountScheduleMemo
 * 個人の予定メモを表す型。
 * 
 * #### 継承元のモデル
 * - [ScheduleMemo](./schedule_memo.ts)
 * 
 * #### これを継承するモデル
 * なし
 * 
 * #### これを継承するDBスキーマ
 * - [DBAccountScheduleMemo](../../lib/firestore/schemas/account/schedule_memos.ts)
 */
export type AccountScheduleMemo = ScheduleMemo;
