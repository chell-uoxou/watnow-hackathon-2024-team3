import { Outlet } from "@remix-run/react";
import { AppTopBar } from "@/components/common/AppTopBar";

const app = () => {
  return (
    <div className="bg-slate-50 h-svh">
      <AppTopBar />
      <Outlet />
    </div>
  );
};

export default app;
