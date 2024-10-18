import { GeoPoint } from "firebase/firestore";
import { BudgetMode, TimeRange } from "./common";

/**
 * ## EventPoolItem
 * イベント候補一覧に登録されるイベント候補の、グループ、個人に共通の型。
 *
 * #### 継承元のモデル
 *   なし
 *
 * #### これを継承するモデル
 *   なし
 *
 * #### これを継承するDBスキーマ
 *  - [DBGroupEventPoolItem](../../lib/firestore/schemas/group/event_pool.ts)
 *  - [DBAccountEventPoolItem](../../lib/firestore/schemas/account/event_pool.ts)
 *
 */
export type EventPoolItem = {
  title: string;
  description: string;
  location_text: string;
  location_coordinates: GeoPoint | null;
  attached_image: string;
  available_times: TimeRange[];
  default_duration: number;
  default_budget: {
    mode: BudgetMode;
    value: number;
  };
  needs_preparation: boolean;
  preparation_task: string;
  max_participants: number;
  notes: string;
};
