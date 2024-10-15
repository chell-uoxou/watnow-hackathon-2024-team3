<a name="accounts"></a>

# accounts コレクション

## フィールド

- `email` (string): メアド
- `default_display_name` (string): デフォルトの表示名
- `avatar_url` (string, URL): アバターURL
- `password_hash` (string): パスワード（salt付きでhash化）
- `last_name` (string): 姓
- `first_name` (string): 名
- `phone_number` (string): 電話番号
- `address` (string): 住所

## サブコレクション
<a name="accounts/event_pool"></a>

### event_pool

- `title` (string): イベント候補タイトル
- `description` (string): イベント候補説明
- `location` (string): イベント候補場所
- `attached_image` (string, URL): イベント候補添付画像
- `available_times` (array): 行ける時間（配列）
  - **各要素のフィールド**
    - `start_time` (timestamp): 行ける時間開始日時
    - `end_time` (timestamp): 行ける時間終了日時
- `default_duration` (integer, minutes): デフォルト所要時間
- `default_budget` (object): デフォルト予算
  - `mode` (string): デフォルト予算モード（`per_person` / `total`）
  - `value` (integer): デフォルト予算値
- `needs_preparation` (boolean): 参加準備が必要か？
- `preparation_task` (string): 参加準備のタスク
- `max_participants` (integer): 最大人数
- `notes` (string): 備考欄

<a name="accounts/schedule_memos"></a>

### schedule_memos

- `title` (string): 予定メモタイトル
- `description` (string): 予定メモ説明
- `start_time` (timestamp): 予定メモ開始日時
- `end_time` (timestamp): 予定メモ終了日時
- `location` (string): 予定メモ場所

<a name="accounts/schedules"></a>

### schedules

- `event_reference` (Reference): 予定イベント候補への参照（`accounts/{accountId}/event_pool/{eventId}`）
- `start_time` (timestamp): 予定開始日時
- `end_time` (timestamp): 予定終了日時
- `members` (array of References): 予定メンバー（`accounts/{accountId}/members/{memberId}`）
- `actual_budget` (object): 予定実際の予算
  - `mode` (string): 予定実際の予算モード（`per_person` / `total`）
  - `value` (integer): 予定実際の予算値
- `did_prepare` (boolean): 参加準備をしたかどうか

---

<a name="groups"></a>

# groups コレクション

- `name` (string): グループ名
- `description` (string): グループ説明
- `icon_url` (string, URL): グループアイコンURL

## サブコレクション

<a name="groups/event_pool"></a>

### event_pool

- `title` (string): グループイベント候補タイトル
- `description` (string): グループイベント候補説明
- `location` (string): グループイベント候補場所
- `attached_image` (string, URL): グループイベント候補添付画像
- `available_times` (array): グループ行ける時間（配列）
  - **各要素のフィールド**
    - `start_time` (timestamp): 行ける時間開始日時
    - `end_time` (timestamp): 行ける時間終了日時
- `default_duration` (integer, minutes): グループデフォルト所要時間
- `default_budget` (object): グループデフォルト予算
  - `mode` (string): グループデフォルト予算モード（`per_person` / `total`）
  - `value` (integer): グループデフォルト予算値
- `needs_preparation` (boolean): 参加準備が必要か？
- `preparation_task` (string): 参加準備のタスク
- `max_participants` (integer): 最大人数
- `notes` (string): 備考欄

<a name="groups/schedule_memos"></a>

### schedule_memos

- `title` (string): グループ予定メモタイトル
- `description` (string): グループ予定メモ説明
- `start_time` (timestamp): グループ予定メモ開始日時
- `end_time` (timestamp): グループ予定メモ終了日時
- `location` (string): グループ予定メモ場所
- 
<a name="groups/common_schedules"></a>

### common_schedules

- `event_reference` (Reference): グループ共通予定イベント候補への参照（`groups/{groupId}/event_pool/{eventId}`）
- `start_time` (timestamp): グループ共通予定開始日時
- `end_time` (timestamp): グループ共通予定終了日時
- `members` (array of References): グループ共通予定メンバー（`groups/{groupId}/members/{memberId}`）
- `actual_budget` (object): グループ共通予定実際の予算
  - `mode` (string): 実際の予算モード（`per_person` / `total`）
  - `value` (integer): 実際の予算値
- `did_prepare` (boolean): 参加準備をしたかどうか

<a name="groups/open_schedules"></a>

### open_schedules

- `event_reference` (Reference): グループ自由予定イベント候補への参照（`groups/{groupId}/event_pool/{eventId}`）
- `start_time` (timestamp): グループ自由予定開始日時
- `end_time` (timestamp): グループ自由予定終了日時
- `members` (array of References): グループ自由予定メンバー（`groups/{groupId}/members/{memberId}`）
- `actual_budget` (object): グループ自由予定実際の予算
  - `mode` (string): 実際の予算モード（`per_person` / `total`）
  - `value` (integer): 実際の予算値
- `did_prepare` (boolean): 参加準備をしたかどうか

<a name="groups/members"></a>

### members

- `account_reference` (Reference): グループメンバーへの参照（`accounts/{accountId}`）
- `display_name` (string): グループメンバー表示名
- `editing_permission_scopes` (array): グループメンバー権限（`common_schedules`、`open_schedules`、`event_pool`、`group_settings`）
- `notes` (string): グループメンバー備考
