import { Timestamp } from "firebase/firestore";
import { WithUid } from "~/lib/firestore";

export type ScheduleMemo = WithUid<{
  title: string;
  description: string;
  start_time: Timestamp;
  end_time: Timestamp;
  location: string;
}>;