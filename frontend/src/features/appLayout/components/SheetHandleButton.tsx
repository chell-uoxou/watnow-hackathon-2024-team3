import { ChevronLeft, ChevronRight } from "lucide-react";

interface HandleButton {
  direction: "left" | "right";
  onClick: () => void;
}

export function SheetHandleButton(props: HandleButton) {
  return (
    <div
      className="absolute -left-6 flex w-4.5 h-20 py-12 bg-white border-brand-border-color items-center border rounded-l-2xl cursor-pointer hover:bg-accent hover:text-accent-foreground w-6"
      onClick={props.onClick}
    >
      {props.direction === "left" ? (
        <ChevronLeft className="size-6   " />
      ) : (
        <ChevronRight className="size-6  " />
      )}
    </div>
  );
}
