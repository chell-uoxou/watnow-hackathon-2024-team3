import { TimelineGridLine } from "./components/TimelineGridLine";

interface TimelineProps {
  itemHeight: number;
  interval: 1 | 0.5 | 0.25; //１時間毎、３０分毎、１５分に区切りを追加
}

export const Timeline = ({ itemHeight, interval }: TimelineProps) => {
  //インターバル毎に区切る時間の設定
  function getDividedMinutes(intervalType: 1 | 0.5 | 0.25): number[] {
    let minutes = [0];

    switch (intervalType) {
      case 0.25:
        minutes.push(15, 30, 45);
        break;
      case 0.5:
        minutes.push(30);
        break;
      default:
        break;
    }
    return minutes;
  }
  const minutes = getDividedMinutes(interval);

  return (
    <div className="flex flex-col items-left w-full">
      {/* １つ１時間、計２４時間の繰り返し */}
      {[...Array(24)].map((_, hour) => (
        <div>
          {/* ミニッツを用い１時間あたりのグリットの生成*/}
          {minutes.map((minute, index) => (
            <TimelineGridLine
              itemHeight={itemHeight}
              interval={interval}
              hour={hour}
              minutes={minute}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
