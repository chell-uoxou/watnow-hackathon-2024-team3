import { WithUid } from "~/lib/firestore/firestore";
import { GroupCommonSchedule } from "~/models/types/group_common_schedule";

export type DBGroupCommonSchedule = WithUid<GroupCommonSchedule>;
