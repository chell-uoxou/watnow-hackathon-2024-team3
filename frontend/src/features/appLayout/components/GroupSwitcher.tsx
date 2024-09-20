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
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type Framework = {
  value: string;
  name: string;
  icon_url: string;
};

type Props = {
  current_icon_url?: string;
  current_name?: string;
};

const frameworks: Framework[] = Array.from({ length: 50 }).map((_, i, a) => ({
  value: `v1.2.0-beta.${a.length - i}`,
  name: `Framework ${a.length - i}`,
  icon_url: `/images/defaultIcon.png`, // 実際のアイコンURLに変更
}));

export function GroupSwitcher({
  current_icon_url = "/images/defaultIcon.png",
  current_name = "プライベート",
}: Props) {
  const [openGroupSwitcher, setOpenGroupSwitcher] = React.useState(false);
  const [selectedFramework, setSelectedFramework] =
    React.useState<Framework | null>(null);

  return (
    <Popover open={openGroupSwitcher} onOpenChange={setOpenGroupSwitcher}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={openGroupSwitcher}
          className="w-[200px] justify-between rounded-full"
        >
          <div className="flex items-center">
            {/* 常に selectedFramework のアイコンと名前を表示、選択されていない場合はデフォルト */}
            <Image
              src={selectedFramework?.icon_url || current_icon_url}
              alt="Selected Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            {selectedFramework ? selectedFramework.name : current_name}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <ScrollArea className="h-72 w-full">
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      setSelectedFramework(framework);
                      setOpenGroupSwitcher(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFramework?.value === framework.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {/* 各フレームワークのアイコンと名前を表示 */}
                    <Image
                      src={framework.icon_url}
                      alt={framework.name}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {framework.name}
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
