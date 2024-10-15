import { WithUid } from "~/lib/firestore/firestore";
import { AccountSchedule } from "~/models/types/account_schedule";

export type DBSchedule = WithUid<AccountSchedule>;
