"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Group } from "~/models/types/groups";
import { LoadingSpinner } from "~/components/ui/spinner";

type Props = {
  current_icon_url?: string;
  current_name?: string;
  groups: Group[];
  isLoading: boolean;
};

export function GroupSwitcher({
  current_icon_url = "/images/defaultIcon.png",
  current_name = "プライベート",
  isLoading,
  groups,
}: Props) {
  const [openGroupSwitcher, setOpenGroupSwitcher] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null);

  return (
    <Popover open={openGroupSwitcher} onOpenChange={setOpenGroupSwitcher}>
      <PopoverTrigger asChild>
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
                {/* 常に selectedFramework のアイコンと名前を表示、選択されていない場合はデフォルト */}
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
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>まだどこのグループにも属していません。</CommandEmpty>
            <ScrollArea className="h-72 w-full">
              <CommandGroup>
                {groups.map((group) => (
                  <CommandItem
                    key={group.uid}
                    value={group.name}
                    onSelect={() => {
                      setSelectedGroup(group);
                      setOpenGroupSwitcher(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedGroup?.uid === group.uid
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <Image
                      src={group.icon_url}
                      alt={group.name}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {group.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
