import { WithUid } from "~/lib/firestore/firestore";
import { AccountEventPoolItem } from "~/models/types/account_event_pool_item";

export type DBAccountEventPoolItem = WithUid<AccountEventPoolItem>;
