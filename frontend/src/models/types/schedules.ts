import { DocumentReference, Timestamp } from "firebase/firestore";
import { EventPool } from "./event_pool";
import { BudgetMode } from "./common";
import Member from "./members";
import { WithUid } from "~/lib/firestore";

export type Schedule = WithUid<{
  event_reference: DocumentReference<EventPool>;
  start_time: Timestamp;
  end_time: Timestamp;
  members: DocumentReference<Member>[];
  actual_budget: {
    mode: BudgetMode;
    value: number;
  };
  did_prepare: boolean;
}>;