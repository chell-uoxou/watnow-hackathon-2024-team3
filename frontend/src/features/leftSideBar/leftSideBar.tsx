import { ViewTitle } from "~/components/common/ViewTitle";
import { CalendarTile } from "./components/calendarTile";
import { ButtonTile } from "./components/ButtonTile";

interface LeftSideBarProps {
  title: string;
  subTitle?: string;
}

export const LeftSideBar = (props: LeftSideBarProps) => {
  return (
    <div className="flex flex-col p-6 justify-between">
      <div className="flex flex-col gap-3">
        <ViewTitle title={props.title} subTitle={props.subTitle} />
        <CalendarTile />
      </div>
      <div className="flex flex-col gap-3">
        <ButtonTile
          color="default"
          text="イベント候補一覧"
          URL="/practice/test4"
        />
        <ButtonTile
          color="outline"
          text="予定を追加する"
          URL="/practice/test4"
        />
      </div>
    </div>
  );
};
