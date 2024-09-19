import { Button } from "~/components/ui/button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { Link } from "@remix-run/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "~/components/ui/sheet";

import { Menu } from "lucide-react";

export function Hamburger() {
  const side = "left";
  return (
    <Sheet key={side}>
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
        <div className="grid gap-4 py-4 "></div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

