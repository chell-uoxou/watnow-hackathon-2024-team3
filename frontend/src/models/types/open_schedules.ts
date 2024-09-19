import { DocumentReference, Timestamp } from "firebase/firestore";
import { Reference } from "react";

export default interface OpenSchedule {
  event_reference:Reference;
  start_time:Timestamp;
  end_time:Timestamp;
  members:DocumentReference;
  actual_budget:{
    mode:string;
    value:number;
  }
  did_prepare:boolean;
}
