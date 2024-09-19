import { DocumentReference, Timestamp } from "firebase/firestore";
import EventPool from "./event_pool";
import Member from "./members";
import { BudgetMode } from "./common";

export default interface CommonSchedule {
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
