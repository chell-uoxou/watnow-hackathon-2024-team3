import { DocumentReference } from "firebase/firestore";
import { EventPoolItem } from "./event_pool_item";
import { Account } from "./account";
import { Member } from "./member";

/**
 * ## AccountEventPoolItem
 * イベント候補のうち、特に個人が関わるイベントを表す
 *
 * #### 継承元のモデル
 * - [EventPoolItem](./event_pool_item.ts)
 *
 * #### これを継承するモデル
 * なし
 *
 * #### これを継承するDBスキーマ
 * - [DBGroupEventPoolItem](../../lib/firestore/schemas/group/event_pool.ts)
 */

export type GroupEventPoolItem = EventPoolItem & {
  created_by_account: DocumentReference<Account>;
  created_by_member: DocumentReference<Member>;
};
