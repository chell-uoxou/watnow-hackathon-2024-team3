import { DocumentReference } from "firebase/firestore";
import { Member } from "./member";
import { Schedule } from "./schedule";

export type GroupCommonSchedule = Schedule & {
  members: DocumentReference<Member>[];
};
