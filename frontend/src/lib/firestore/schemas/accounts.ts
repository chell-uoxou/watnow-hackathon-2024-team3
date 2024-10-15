import { WithUid } from "~/lib/firestore/firestore";
import { Account } from "~/models/types/account";

export type DBAccount = WithUid<Account>;
