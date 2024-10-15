import { WithUid } from "~/lib/firestore/firestore";
import { GroupOpenSchedule } from "~/models/types/group_open_schedule";

export type DBOpenSchedule = WithUid<GroupOpenSchedule>;
