import { WithUid } from "../firestore";
import { Group } from "~/models/types/group";

export type DBGroup = WithUid<Group>;
