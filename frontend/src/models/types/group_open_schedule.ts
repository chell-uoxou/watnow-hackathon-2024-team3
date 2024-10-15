import { DocumentReference } from "firebase/firestore";
import { Member } from "./member";
import { Schedule } from "./schedule";

export type GroupOpenSchedule = Schedule & {
  members: DocumentReference<Member>[];
};
