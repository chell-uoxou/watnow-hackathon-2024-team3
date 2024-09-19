import { WithUid } from "~/lib/firestore";

export type Group = WithUid<{
  name: string;
  description: string;
  icon_url: string;
}>;
