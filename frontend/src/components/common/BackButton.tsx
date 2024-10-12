import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = (props: BackButtonProps) => {
  return (
    <div className="flex gap-1 -translate-x-2">
      <Button
        variant="ghost"
        // className="size-6 font-bold text-base"
        className="flex font-bold text-base h-8 "
        onClick={props.onClick}
      >
        <div className="flex items-center gap-1">
          <ChevronLeft className="-ml-2" />
          戻る
        </div>
      </Button>
    </div>
  );
};

export default BackButton;
