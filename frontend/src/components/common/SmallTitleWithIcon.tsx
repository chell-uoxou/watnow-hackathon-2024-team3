import React, { ReactNode } from "react";
import { Blend } from "lucide-react";

interface SmallTitleWithIconProps {
  icon: ReactNode;
  title: string;
  isLoading?: boolean;
}

const SmallTitleWithIcon = (props: SmallTitleWithIconProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="size-6">{props.icon}</div>
      <h2 className="text-xl font-bold">{props.title}</h2>
    </div>
  );
};

export default SmallTitleWithIcon;
