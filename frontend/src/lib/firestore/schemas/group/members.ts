import { WithUid } from "~/lib/firestore/firestore";
import { Member } from "~/models/types/member";

export type DBMember = WithUid<Member>;
