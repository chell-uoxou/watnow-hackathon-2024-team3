import { EditingPermissionScope } from "./common";
import { DocumentReference } from "firebase/firestore";
import Account from "./account";

export default interface Member {
  account_reference: DocumentReference<Account>;
  display_name: string;
  editing_permission_scopes: EditingPermissionScope[];
  notes: string;
}
