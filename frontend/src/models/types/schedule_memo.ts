import { Timestamp } from "firebase/firestore";

/**
 * ### ScheduleMemo
 * イベント候補をわざわざ作成するほどでもない、カレンダー上に自由に記述できる予定メモの型。
 * 
 * #### これを継承するモデル
 * - [AccountScheduleMemo](./account_schedule_memo.ts)
 * - [GroupScheduleMemo](./group_schedule_memo.ts)
 * 
 * #### これを継承するDBスキーマ
 *  なし
 */
export type ScheduleMemo = {
  title: string;
  description: string;
  start_time: Timestamp;
  end_time: Timestamp;
  location: string;
};
