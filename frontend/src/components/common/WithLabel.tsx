import React, { PropsWithChildren } from "react";

interface WithLabel extends PropsWithChildren {
  label: string;
}

export const WithLabel = (props: WithLabel) => {
  const { label, children } = props;

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <div className="text-sm max-w-{size} text-left text-slate-900 font-bold">
        {label}
      </div>
      {children}
    </div>
  );
};
