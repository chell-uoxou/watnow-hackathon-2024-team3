import { Reference } from "react";
import Account from "./account";
import { DocumentReference, Timestamp } from "firebase/firestore";

export default interface Schedule {
  event_reference:Reference;
  start_time:Timestamp;
  end_time:Timestamp;
  members:DocumentReference<Account>[];
  actual_budget:{
    mode:string;
    value:number;
  };
  did_prepare:boolean;

}