import { Button } from "~/components/ui/button";
import { Plus, Blocks } from "lucide-react";

interface ButtonProps {
  color: "default" | "outline";
  text: string;
  URL?: string;
}

export function ButtonTile(props: ButtonProps) {
  return (
    <Button
      variant={props.color}
      className="flex flex-row w-full h-10 gap-1 text-sm items-center justify-center"
    >
      {/* 三項演算子でアイコンを条件分岐 */}
      {props.text === "イベント候補一覧" ? (
        <Blocks className="h-5 w-5" />
      ) : props.text === "予定を追加する" ? (
        <Plus className="h-5 w-5" />
      ) : null}
      {props.text}
    </Button>
  );
}
