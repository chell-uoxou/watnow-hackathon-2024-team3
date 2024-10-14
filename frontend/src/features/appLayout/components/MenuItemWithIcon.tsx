import React from "react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

interface MenuItemWithIconProps {
  icon: React.ReactNode;
  title: string;
}

const MenuItemWithIcon = (props: MenuItemWithIconProps) => {
  return (
    <DropdownMenuItem className="font-bold ">
      <div>{props.icon}</div>
      {props.title}
    </DropdownMenuItem>
  );
};

export default MenuItemWithIcon;
