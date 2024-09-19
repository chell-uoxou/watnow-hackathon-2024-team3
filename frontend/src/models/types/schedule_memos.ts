import { Timestamp } from "firebase/firestore";

export default interface ScheduleMemo{
  title:string;
  description:string;
  start_time:Timestamp;
  end_time:Timestamp;
  location:string;
}