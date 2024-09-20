import { PropsWithChildren } from "react";
import { AppTopBar } from "~/components/common/AppTopBar";
import { LeftSideBar } from "~/components/common/LeftSideBar";

export default function App({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-row min-h-screen">
      <div className="flex bg-brand-color-3 h-screen border-brand-border-color border">
        <LeftSideBar />
      </div>
      <div className="w-screen h-10 bg-slate-950 ">
        <AppTopBar />
        {children}
      </div>
    </main>
  );
};
