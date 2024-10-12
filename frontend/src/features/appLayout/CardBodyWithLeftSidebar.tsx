import { PropsWithChildren, ReactNode } from "react";

interface CardBodyWithLeftSidebarProps extends PropsWithChildren {
  leftSidebar: ReactNode;
}

export const CardBodyWithLeftSidebar = (
  props: CardBodyWithLeftSidebarProps
) => {
  return (
    <div className="flex gap-0 w-full h-full">
      <div className="border-r border-brand-border-color h-full">
        {props.leftSidebar}
      </div>
      <div className="bg-gray-100 size-full p-6">
        <div className="flex-1 shadow-xl rounded-lg bg-white size-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};
