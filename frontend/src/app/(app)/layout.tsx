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

      <div className="flex-1">
        <AppTopBar />
        <div className="">{children}</div>
      </div>
      {/* <LeftSideBar open={open} onOpenChange={setOpen} /> */}
    </main>
  );
}
