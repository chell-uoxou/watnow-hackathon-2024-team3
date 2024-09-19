import { DocumentReference, Timestamp } from "firebase/firestore";
import { Reference } from "react";
import Account from "./account";

export default interface CommonSchedule {
  event_reference:Reference;
  start_time:Timestamp;
  end_time:Timestamp;
  members:DocumentReference<Account>[];
  actual_budget:{
    mode:string;
    value:number;
  }
  did_prepare:boolean;
}