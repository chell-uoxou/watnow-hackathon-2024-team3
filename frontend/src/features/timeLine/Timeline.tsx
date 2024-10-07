import { TimelineGridLine } from "./components/TimelineGridLine";

interface TimelineProps {
  hourHeight: number;
  interval: 1 | 0.5 | 0.25;
}

export const Timeline = ({ hourHeight, interval }: TimelineProps) => {
  // Function to return minutes based on the interval type
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

  // Generate the list of minutes for the provided interval
  const minutes = getDividedMinutes(interval);

  return (
    <div className="flex flex-col items-left w-full">
      {/* Loop through each hour (0 to 23) */}
      {[...Array(24)].map((_, hour) => (
        <div key={hour}>
          {/* Loop through each minute interval for the current hour */}
          {minutes.map((minute, index) => (
            <TimelineGridLine
              key={`${hour}-${index}`}
              itemHeight={hourHeight}
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
