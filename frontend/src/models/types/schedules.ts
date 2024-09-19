import { DocumentReference, Timestamp } from "firebase/firestore";
import EventPool from "./event_pool";
import { BudgetMode } from "./common";
import Member from "./members";

export default interface Schedule {
  event_reference: DocumentReference<EventPool>;
  start_time: Timestamp;
  end_time: Timestamp;
  members: DocumentReference<Member>[];
  actual_budget: {
    mode: BudgetMode;
    value: number;
  };
  did_prepare: boolean;
}
