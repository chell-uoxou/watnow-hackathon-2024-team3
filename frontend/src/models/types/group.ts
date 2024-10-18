/**
 * ## Group
 * 予定を共同編集するためのグループを表す型
 *
 * #### これを継承するモデル
 *   なし
 *
 * #### これを継承するDBスキーマ
 * - [DBGroup](../../lib/firestore/schemas/groups.ts)
 */
export type Group = {
  name: string;
  description: string;
  icon_url: string;
};
