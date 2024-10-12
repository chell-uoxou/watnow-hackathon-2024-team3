"use client";
import React from "react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";

interface DateSwitcherProps {
  value: Date;
  onChange: (value: Date) => void;
}

const DateSwitcher = (props: DateSwitcherProps) => {
  const handlePreviousDay = () => {
    const newValue = new Date(props.value);
    newValue.setDate(newValue.getDate() - 1);
    props.onChange(newValue);
  };

  const handleNextDay = () => {
    const newValue = new Date(props.value);
    newValue.setDate(newValue.getDate() + 1);
    props.onChange(newValue);
  };

  const weekDay: {
    [key: number]: string;
  } = {
    0: "日",
    1: "月",
    2: "火",
    3: "水",
    4: "木",
    5: "金",
    6: "土",
  };

  return (
    <div className="w-[44px] p-2 bg-white border border-brand-border-color rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <div>
          <Button
            variant="outline"
            size="icon"
            className="size-6"
            onClick={handlePreviousDay}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-sm">
            {props.value.getMonth() + 1}
          </p>
          <p className="font-bold text-2xl">{props.value.getDate()}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{weekDay[props.value.getDay()]}</p>
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            className="size-6"
            onClick={handleNextDay}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateSwitcher;
