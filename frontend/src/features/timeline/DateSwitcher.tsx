import React from "react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";

const Dateswitcher =(props) =>{

  const weekDay: {
    [key: number]: string;
  } = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土',
  };

  return (
    <div className="w-[44px] p-2">
      <div className="flex flex-col items-center gap-2">
        <div className="">
          <Button variant="outline" size="icon" className="size-6" onClick={props.handlePreviousDay}>
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center h-[46px]">
          <p className="font-bold text-sm h-[17px]">{props.value.getMonth() + 1}</p>
          <p className="font-bold text-2xl h-[29px]">{props.value.getDate()}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{weekDay[props.value.getDay()]}</p>
        </div>
        <div className="">
          <Button variant="outline" size="icon" className="size-6" onClick={props.handleNextDay}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dateswitcher;
