"use client";
import * as React from "react";
import MenuItemWithIcon from "./MenuItemWithIcon";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { LoadingSpinner } from "~/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserRoundPlus } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Settings } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { List } from "lucide-react";
import { UserRound } from "lucide-react";
import { DBAccount, DBGroup, DBGroupMember } from "~/lib/firestore/schemas";
import { doc } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { defaultConverter } from "~/lib/firestore/firestore";

type Props = {
  current_icon_url?: string;
  current_name?: string;
  groups: DBGroup[];
  isLoading: boolean;
};

export function GroupSwitcher({
  current_icon_url = "/images/defaultIcon.png",
  current_name = "プライベート",
  isLoading,
  groups,
}: Props) {
  const [openGroupSwitcher, setOpenGroupSwitcher] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<DBGroup | null>(
    null
  );

  const dummyGroup1: DBGroup = {
    uid: "1",
    name: "グループ1",
    description: "グループ1の説明",
    icon_url: "/images/defaultIcon.png",
    created_by_account: doc(db, "accounts", "1").withConverter(
      defaultConverter<DBAccount>()
    ),
    created_by_member: doc(db, "members", "1").withConverter(
      defaultConverter<DBGroupMember>()
    ),
  };
  const dummyGroup2: DBGroup = {
    uid: "2",
    name: "グループ2",
    description: "グループ2の説明",
    icon_url: "/images/defaultIcon.png",
    created_by_account: doc(db, "accounts", "1").withConverter(
      defaultConverter<DBAccount>()
    ),
    created_by_member: doc(db, "members", "1").withConverter(
      defaultConverter<DBGroupMember>()
    ),
  };

  const dummyGroup3: DBGroup = {
    uid: "3",
    name: "グループ3",
    description: "グループ3の説明",
    icon_url: "/images/defaultIcon.png",
    created_by_account: doc(db, "accounts", "1").withConverter(
      defaultConverter<DBAccount>()
    ),
    created_by_member: doc(db, "members", "1").withConverter(
      defaultConverter<DBGroupMember>()
    ),
  };

  const dummyGroup4: DBGroup = {
    uid: "4",
    name: "グループ4",
    description: "グループ4の説明",
    icon_url: "/images/defaultIcon.png",
    created_by_account: doc(db, "accounts", "1").withConverter(
      defaultConverter<DBAccount>()
    ),
    created_by_member: doc(db, "members", "1").withConverter(
      defaultConverter<DBGroupMember>()
    ),
  };

  const allGroups = [
    ...groups,
    dummyGroup1,
    dummyGroup2,
    dummyGroup3,
    dummyGroup4,
  ]; // ここ後々消す

  return (
    <DropdownMenu open={openGroupSwitcher} onOpenChange={setOpenGroupSwitcher}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={openGroupSwitcher}
          className="w-[200px] justify-between rounded-full"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex items-center">
                <Image
                  src={selectedGroup?.icon_url || current_icon_url}
                  alt="Selected Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {selectedGroup ? selectedGroup.name : current_name}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {selectedGroup && (
          <>
            <MenuItemWithIcon
              icon={<UserRoundPlus className="mr-2 h-4 w-4" />}
              title="友達を招待"
            />
            <MenuItemWithIcon
              icon={<UsersRound className="mr-2 h-4 w-4" />}
              title="メンバーリスト"
            />
            <MenuItemWithIcon
              icon={<Settings className="mr-2 h-4 w-4" />}
              title="グループ設定"
            />
            <DropdownMenuSeparator className="border" />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              setSelectedGroup(null);
              setOpenGroupSwitcher(false);
            }}
            className="font-bold"
          >
            <UserRound className="mr-2 h-4 w-4" />
            個人のカレンダー
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border" />
          <DropdownMenuLabel>参加中のグループ</DropdownMenuLabel>
          {allGroups.length === 0 ? (
            <DropdownMenuItem disabled>
              まだグループに参加していません。
            </DropdownMenuItem>
          ) : (
            allGroups.map(
              //TODO:allGroupsをgroupsに変更
              (group) => (
                <DropdownMenuItem
                  key={group.uid}
                  onSelect={() => {
                    setSelectedGroup(group);
                    setOpenGroupSwitcher(false);
                  }}
                  className="flex"
                >
                  <Image
                    src={group.icon_url}
                    alt={group.name}
                    width={24}
                    height={24}
                    className="flex mr-2"
                  />
                  {group.name}
                </DropdownMenuItem>
              )
            )
          )}
        </DropdownMenuGroup>
        <MenuItemWithIcon
          icon={<List className="mr-2 h-4 w-4" />}
          title="グループ一覧"
        />
        <MenuItemWithIcon
          // {/* TODO:新規作成の処理を追加 */}
          icon={<CirclePlus className="mr-2 h-4 w-4" />}
          title="新規作成"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
