import { WithUid } from "~/lib/firestore/firestore";
import { AccountScheduleMemo } from "~/models/types/account_schedule_memo";

export type DBScheduleMemo = WithUid<AccountScheduleMemo>;
