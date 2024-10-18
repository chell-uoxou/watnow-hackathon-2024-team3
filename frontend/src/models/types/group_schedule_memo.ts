import { ScheduleMemo } from "./schedule_memo";

/**
 * ## GroupScheduleMemo
 * 予定メモのうち、グループ内で共有される予定メモを表す型。
 * 
 * #### これを継承するモデル
 * なし
 * 
 * #### これを継承するDBスキーマ
 * [DBGroupScheduleMemo](../../lib/firestore/schemas/group/schedule_memos.ts)
 */
export type GroupScheduleMemo = ScheduleMemo;
