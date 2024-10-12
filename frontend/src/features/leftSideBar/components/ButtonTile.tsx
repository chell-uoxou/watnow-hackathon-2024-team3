import { Button, ButtonProps } from "~/components/ui/button";
import { ReactNode } from "react";

type ButtonTileProps = Omit<ButtonProps, "className"> & {
  icon: ReactNode;
  href: string;
};

export function ButtonTile(props: ButtonTileProps) {
  const { children, ...rest } = props;
  return (
    <Button
      className="flex flex-row w-full h-10 gap-1 text-sm items-center justify-center"
      {...rest}
    >
      {props.icon}
      {children}
    </Button>
  );
}
