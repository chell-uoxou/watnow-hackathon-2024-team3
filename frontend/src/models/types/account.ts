import { WithUid } from "~/lib/firestore";

export type Account = WithUid<{
  email: string;
  default_display_name: string;
  avatar_url: string;
  password_hash: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  address: string;
}>;
