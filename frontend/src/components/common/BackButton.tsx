import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = (props: BackButtonProps) => {
  return (
    <div className="flex gap-1 h-5">
      <Button
        variant="ghost"
        className="size-6 font-bold text-base"
        onClick={props.onClick}
      >
        <div className="flex items-center">
          <ChevronLeft className="size-5" />
          戻る
        </div>
      </Button>
    </div>
  );
};

export default BackButton;
