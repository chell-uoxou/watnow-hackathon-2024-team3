import { DocumentReference } from "firebase/firestore";
import { DBGroup } from "~/lib/firestore/schemas";

/**
 * ## Account
 * ユーザー個人の情報を保持する型
 *
 * #### これを継承するモデル
 * なし
 *
 * #### これを参照するモデル
 * なし
 *
 * #### これを継承するDBスキーマ
 * - [DBAccount](../../lib/firestore/schemas/accounts.ts)
 */
export type Account = {
  email: string;
  default_display_name: string;
  avatar_url: string;
  password_hash: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  address: string;
  groups: DocumentReference<DBGroup>[];
};
