import { ChevronLeft, ChevronRight } from "lucide-react";

interface HandleButton {
  direction: "left" | "right";
  onClick: () => void; // クリックイベントハンドラーを受け取る
}

export function SheetHandleButton(props: HandleButton) {
  return (
    <div
      className="flex w-4.5 h-20 py-12 bg-white border-brand-border-color items-center border rounded-l-2xl cursor-pointer hover:bg-accent hover:text-accent-foreground"
      onClick={props.onClick} // onClickイベントを設定
    >
      {props.direction === "left" ? (
        <ChevronLeft className="size-6   " />
      ) : (
        <ChevronRight className="size-6  " />
      )}
    </div>
  );
}
