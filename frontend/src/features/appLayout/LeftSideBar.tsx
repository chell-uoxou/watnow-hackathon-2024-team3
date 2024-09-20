"use client";

import React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../../components/ui/sheet";

interface LeftSideBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeftSideBar = (props: LeftSideBarProps) => {
  const side = "left";

  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side={side} className="flex flex-col min-h-screen w-96">
        <SheetHeader>
          <SheetTitle>a</SheetTitle>
          <SheetDescription>メンバ一覧</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
