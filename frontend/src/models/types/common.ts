import { Timestamp } from "firebase/firestore";

export type BudgetMode = "per_person" | "total";

export type TimeRange = {
  start_time: Timestamp;
  end_time: Timestamp;
};

export type EditingPermissionScope =
  | "common_schedules"
  | "open_schedules"
  | "event_pool"
  | "group_settings";
