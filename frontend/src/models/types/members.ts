import { Reference } from "react";

export type EditingPermissionScope = "common_schedules" | "open_schedules" | "event_pool" | "group_settings"

export default interface Member {
  account_reference:Reference;
  display_name:string;
  editing_permission_scopes : EditingPermissionScope[];
  notes:string;
}