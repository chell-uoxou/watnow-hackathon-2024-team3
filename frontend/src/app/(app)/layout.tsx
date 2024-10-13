"use client";
import { PropsWithChildren } from "react";
import { AppTopBar } from "~/features/appLayout/AppTopBar";
// import { LeftSideBar } from "~/features/appLayout/LeftSideBar";

export default function App({ children }: PropsWithChildren) {
  // const [open, setOpen] = useState(false);
  return (
    <main className="flex flex-col h-svh w-full">
      <AppTopBar />
      <div className="flex-1 size-full pt-14">{children}</div>
    </main>
  );
}
