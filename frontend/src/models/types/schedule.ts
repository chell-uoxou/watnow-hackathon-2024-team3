import { DocumentReference, Timestamp } from "firebase/firestore";
import { EventPoolItem } from "./event_pool_item";
import { BudgetMode } from "./common";

export type Schedule = {
  event_reference: DocumentReference<EventPoolItem>;
  start_time: Timestamp;
  end_time: Timestamp;
  actual_budget: {
    mode: BudgetMode;
    value: number;
  };
  did_prepare: boolean;
};
