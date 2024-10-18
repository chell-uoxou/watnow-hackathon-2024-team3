import { WithUid } from "~/lib/firestore/firestore";
import { GroupEventPoolItem } from "~/models/types/group_event_pool_item";

export type DBGroupEventPoolItem = WithUid<GroupEventPoolItem>;
