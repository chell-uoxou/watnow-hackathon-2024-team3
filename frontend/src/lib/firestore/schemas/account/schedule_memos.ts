import { WithUid } from "~/lib/firestore/firestore";
import { AccountScheduleMemo } from "~/models/types/account_schedule_memo";

export type DBAccountScheduleMemo = WithUid<AccountScheduleMemo>;
