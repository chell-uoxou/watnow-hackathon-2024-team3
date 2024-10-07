interface TimelineGridProps {
  itemHeight: number;
  interval: 1 | 0.5 | 0.25;
  hour: number;
  minutes: number;
  isLast?: boolean;
}

export const TimelineGridLine = (props: TimelineGridProps) => {
  const height = `${props.itemHeight}px`;

  return (
    <div className="flex gap-2 w-full justify-between items-start">
      <span className=" text-xs w-9">
        {props.hour.toString().length === 1 ? "0" + props.hour : props.hour}:
        {props.minutes === 0 ? "00" : props.minutes}
      </span>
      <div
        className={`flex-1 flex w-full ${
          !props.isLast
            ? "w-full translate-y-2 border-t-2 border-zinc-900 border-dashed"
            : ""
        }`}
        style={{ height }}
      />
    </div>
  );
};
