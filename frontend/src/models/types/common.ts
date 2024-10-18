import { Timestamp } from "firebase/firestore";

/**
 * ## BudgetMode
 * 予算の計算方法を表す文字列
 */
export type BudgetMode = "per_person" | "total";

/**
 * ## TimeRange
 * 時間の範囲を表すタプル
 */
export type TimeRange = {
  start_time: Timestamp;
  end_time: Timestamp;
};

/**
 * ## EditingPermissionScope
 * 予定の編集権限の対象を表す文字列。配列に入れて使う。
 * 
 * `common_schedules`: 共通予定を編集できる
 * `open_schedules`: みんなの予定を編集できる（デフォルトで有効）
 * `event_pool`: イベント候補一覧を編集できる（デフォルトで有効）
 * `group_settings`: グループ設定を編集できる
 */
export type EditingPermissionScope =
  | "common_schedules"
  | "open_schedules"
  | "event_pool"
  | "group_settings";
