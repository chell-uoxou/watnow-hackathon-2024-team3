import { WithUid } from "~/lib/firestore/firestore";
import { GroupScheduleMemo } from "~/models/types/group_schedule_memo";

export type DBScheduleMemo = WithUid<GroupScheduleMemo>;
