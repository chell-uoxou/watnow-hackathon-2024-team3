"use client";
import { Menu } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";
import { AppTopBar } from "~/features/appLayout/AppTopBar";
// import { LeftSideBar } from "~/features/appLayout/LeftSideBar";

export default function App({ children }: PropsWithChildren) {
  // const [open, setOpen] = useState(false);
  return (
    <main className="flex h-svh w-full">
      <div className="flex flex-col items-center bg-brand-color-3 w-16 border-brand-border-color border py-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-white hover:bg-transparent hover:text-white"
        >
          <Menu />
        </Button>
      </div>
      <div className="flex-1">
        <AppTopBar />
        <div className="p-8">{children}</div>
      </div>
      {/* <LeftSideBar open={open} onOpenChange={setOpen} /> */}
    </main>
  );
}
