"use client";

import { Menu } from "lucide-react";
import React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  Sheet,
} from "../ui/sheet";
import { Button } from "../ui/button";

export const LeftSideBar = () => {
  const side = "left";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className="flex flex-col min-h-screen w-[100px] sm:w-[140px] "
      >
        <SheetHeader>
          <SheetTitle>a</SheetTitle>
          <SheetDescription>メンバ一覧</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
